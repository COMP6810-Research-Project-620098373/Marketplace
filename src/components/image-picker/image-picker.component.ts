import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  imageViewerOpen: boolean = false;

  /** Array of base64 string images*/
  @Input() images: Array<string> = [];
  @Input() readonly: boolean = false;
  @Output() update = new EventEmitter<Array<string>>();
  guideMessageShown: boolean = false;
  thumbnailLoaded: any = {};

  constructor(
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    for(let x = 0 ; x < this.images.length; x++){
      const img = new Image();
      img.onload = () => {
        this.thumbnailLoaded[x.toString()] = true;
      }
      img.src = this.images[x];
    }
  }

  openFilePicker() {
    (document.getElementById("imageInput") as HTMLElement).click();
  }

  toggleImageViewer() {
    this.imageViewerOpen = !this.imageViewerOpen;
  }

  removeImage(imageIndex: number){
    this.images.splice(imageIndex, 1);
    (document.getElementById("imageInput") as HTMLInputElement)["value"] = "";
    this.update.emit(this.images);
  }

  getBaseUrl(inputFieldEvent: Event) {
    const inputField: any = inputFieldEvent.target
    const file = inputField.files![0]
    const reader = new FileReader()
    let baseString: any
    const parentClass = this;
    reader.onloadend = async function () {
      baseString = reader.result;
      // const fileSize: number = baseString.length / 4 * 3;
      // if (fileSize > 5000000) {
      //   throw new Error("image is too large");
      // }
      switch (baseString.split(",")[1].slice(0, 7)) {
        case "PHN2ZyB":
          break;
        case "/9j/4AA":
          break;
        case "iVBORw0":
          break;
        default:
          const toast = await parentClass.toastController.create({
            message: 'unsupported image type',
            duration: 2000
          });
          toast.present();
          throw new Error("unsupported image type");
      }
      parentClass.images = Array.from(new Set([
        ...parentClass.images,
        baseString
      ]));
      if (!parentClass.guideMessageShown) {
        const toast = await parentClass.toastController.create({
          message: 'Tap an uploaded image to remove it',
          duration: 2000
        });
        toast.present();
        parentClass.guideMessageShown = true;
      }
      parentClass.update.emit(parentClass.images);
    };
    reader.readAsDataURL(file);
  }
}
