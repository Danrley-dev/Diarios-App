import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { DiarioAddComponent } from '../diario-add/diario-add.component';
import { DiarioEditComponent } from '../diario-edit/diario-edit.component';

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.scss'],
})
export class DiarioListComponent implements OnInit {
  allDiarios$?: Observable<Diario[]>;
  meusDiarios$?: Observable<Diario[]>;
  cols: number = 3;
  rows: string = "2:2";

  constructor(
    private dialog: MatDialog,
    private diariosService: DiariosService,
    private toast: HotToastService,
    public breakpointObserver: BreakpointObserver,
  ) { }
  onClickAdd() {
    const ref = this.dialog.open(DiarioAddComponent, { maxWidth: '512px' });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService
            .addDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Adicionando...',
                error: 'Ocorreu um erro',
                success: 'Diário adicionado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickEdit(diario: Diario) {
    const ref = this.dialog.open(DiarioEditComponent, {
      maxWidth: '512px',
      data: { ...diario },
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService
            .editDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Atualizando...',
                error: 'Ocorreu um erro',
                success: 'Diário atualizado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickDelete(diario: Diario) {
    const canDelete = confirm('Deseja mesmo deletar?');
    if (canDelete) {
      this.diariosService
        .deleteDiario(diario)
        .pipe(this.toast.observe({ success: 'Diário apagado!' }))
        .subscribe();
    }
  }

  ngOnInit(): void {
    this.allDiarios$ = this.diariosService.getTodosDiarios();
    this.meusDiarios$ = this.diariosService.getDiariosUsuario();


    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe((status: BreakpointState) => {
      if (status.breakpoints[Breakpoints.XSmall]) {
        this.cols = 1;
        this.rows = "1:1.4"

      }
      if (status.breakpoints[Breakpoints.Small]) {
        this.cols = 2;
        this.rows = "1.5:2.4"

      }
      if (status.breakpoints[Breakpoints.Medium]) {
        this.cols = 3;
        this.rows = "1:1.4"
      }
      if (status.breakpoints[Breakpoints.Large]) {
        this.cols = 4;
        this.rows = "1:1.4"

      }
      if (status.breakpoints[Breakpoints.XLarge]) {
        this.cols = 4;
        this.rows = "1.2:1.4"
      }
    });
  }
}
