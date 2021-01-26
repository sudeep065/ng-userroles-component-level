import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { RolesService } from "../services/roles.service";

@Directive({
  selector: '[ifRoles]'
})
export class IfRolesDirective implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  // the role the user must have 
  @Input() public ifRoles: Array<string>;

  /**
   * @param {ViewContainerRef} viewContainerRef 
   * 	-- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef 
   *   -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService 
   *   -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rolesService: RolesService
  ) {}

  public ngOnInit() { 
    this.subscription.push(
      this.rolesService.roles().subscribe(res => { 
        if (!res.roles) {
          this.viewContainerRef.clear();
        }
        const idx = res.roles.findIndex((element) => this.ifRoles.indexOf(element) !== -1);
        if (idx < 0) {
          this.viewContainerRef.clear();
        } else { 
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}