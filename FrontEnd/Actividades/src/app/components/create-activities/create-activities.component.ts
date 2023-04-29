import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Activity } from 'src/app/service/Activity';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-activities',
  templateUrl: './create-activities.component.html',
  styleUrls: ['./create-activities.component.css']
})
export class CreateActivitiesComponent implements OnInit {

  activity: Activity = new Activity();
  imagen: any;
  
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
  }
  
  onFileChange(event : any) {
    this.imagen = event.target.files[0];
  }
  
  onSubmit(form: NgForm) {
    const formData = new FormData();
    if (form.valid) {
      formData.append('titulo', form.value.titulo);
      formData.append('participantes', form.value.participantes);
      formData.append('localizacion', form.value.localizacion);
      formData.append('precio', form.value.precio);
      formData.append('cantidad', form.value.cantidad);
      formData.append('duracion', form.value.duracion);
      formData.append('descripcion', form.value.descripcion);
      formData.append('edad', form.value.edad);
      formData.append('dificultad', form.value.dificultad);
      formData.append('categoria', form.value.categoria);
      formData.append('imagen', this.imagen);
    
      this.crudService.CreateActivities(formData).subscribe(res => {
        window.alert("Actividad creada correctamente");
        location.reload();
        console.log(res);
      });
    }
  }
  
}
