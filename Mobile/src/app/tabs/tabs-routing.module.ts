import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../services/auth.guard';
import {ShowPageGuard} from '../services/show-page.guard';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'student-form',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/student-form/student-form.module').then(m => m.StudentFormPageModule),
                        canActivate: [ShowPageGuard]
                    }
                ]
            },
            {
                path: 'admin-control',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/admin-control/admin-control.module').then(m => m.AdminControlPageModule)
                    }
                ]
            },
            {
                path: 'admin-assign',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/admin-assign/admin-assign.module').then(m => m.AdminAssignPageModule)
                    }
                ]
            },
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./tab1/tab1.module').then(m => m.Tab1PageModule)
                    }
                ]
            },
            {
                path: 'tab2',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./tab2/tab2.module').then(m => m.Tab2PageModule)
                    }
                ]
            },
            {
                path: 'tab3',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./tab3/tab3.module').then(m => m.Tab3PageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/student-form',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
