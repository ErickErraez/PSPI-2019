import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminControlPage} from './admin-control.page';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: AdminControlPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, FormsModule],
})
export class AdminControlPageRoutingModule {
}
