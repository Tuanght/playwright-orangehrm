import { BasePage } from './../../base.page';
import { Page } from "@playwright/test";
import { PIMNavigatorComponent } from "./components/pimNavigator.component";

export class BasePIMPage extends BasePage{
  protected _employeeId:  string = '';    
  readonly pimNavigator: PIMNavigatorComponent;

  constructor(page: Page) {
    super(page)
    this.pimNavigator = new PIMNavigatorComponent(page)
  }

  // Setter 
  set employeeId(value: string) { if (!value) { throw new Error("Không có id"); } this._employeeId = value; } 
  // Getter 
  get employeeId(): string { return this._employeeId; }
}