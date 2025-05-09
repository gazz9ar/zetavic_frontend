import { HttpEventType } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Signal, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UploadService } from '@buffetly/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SNACKBAR_SUCCESS_MESSAGE_DURATION } from '../../../../utils/types/consts/snackbar-duration.const';

@Component({
  selector: 'buffetly-import',
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatProgressBarModule, MatSnackBarModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportComponent {
  uploadService = inject(UploadService);

  currentFile = signal<File | undefined>(undefined);
  fileInputEl = viewChild('fileInput', { read: ElementRef<HTMLInputElement> });
  isLoading = signal<boolean>(false);
  loadingProgress = signal<number>(0);
  private _snackBar = inject(MatSnackBar);

  /** any error message from upload */
  private _uploadError = signal<string | null>(null);
  readonly uploadError: Signal<string | null> = this._uploadError.asReadonly();


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input);

    if (!input.files?.length) return;
    this.currentFile.set(input.files[0]);
    this._uploadError.set(null);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (!event.dataTransfer?.files.length) return;
    this.currentFile.set(event.dataTransfer.files[0]);
    this._uploadError.set(null);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  handleUpload() {
    const file = this.currentFile();
    if (!file) {
      this._uploadError.set('No file selected.');
      return;
    }

    this.isLoading.set(true);

    this.uploadService.uploadCsv(file)
      .pipe(
    )
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.setLoadingProgress(event.loaded, event.total ?? event.loaded)
          } else if (event.type === HttpEventType.ResponseHeader || event.type === HttpEventType.Response) {
            this.handleFileUploadSuccess();
          }
        },
        error: (err: Error) => {
          this._uploadError.set(err.message);
          this.isLoading.set(false);
        },
        complete: () => this.isLoading.set(false)
      });
  }

  protected handleFileUploadSuccess() {
    this.currentFile.set(undefined);
    this._snackBar.open('File uploaded successfully!', 'Close', { duration: SNACKBAR_SUCCESS_MESSAGE_DURATION });
    if (this.fileInputEl()) this.fileInputEl()!.nativeElement.value = '';
  }

  protected setLoadingProgress(value: number, total: number) {
    this.loadingProgress.set((value * 100) / (total))
  }
}
