import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Activity } from 'src/app/service/Activity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  searchTerm = String();
  Activities: any = [];
  ActivitiesToDisplay: any = [];
  busqueda: any = [];
  activity: Activity = new Activity();

  constructor(private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.crudService.GetActivities().subscribe(res => {
      this.Activities = res;
      this.ActivitiesToDisplay = this.Activities;
    });
  }

  onSearch() {
    this.crudService.searchActivities(this.searchTerm).subscribe(res => {
      this.ActivitiesToDisplay = res;
    });
  }
  
  mostrarFormCrear(){
    var escondido= document.getElementById("escondido");
    if(escondido!=null){
      escondido.style.display = "flex";
    }
    var modificar= document.getElementById("modificarForm");
    if(modificar!=null){
      modificar.style.display = "none";
    }
    var mostrado= document.getElementById("consultar");
    if(mostrado!=null){
      mostrado.style.display = "none";
    }
  }

  mostrarGet(){
    var escondido= document.getElementById("escondido");
    if(escondido!=null){
      escondido.style.display = "none";
    }
    var modificar= document.getElementById("modificarForm");
    if(modificar!=null){
      modificar.style.display = "none";
    }
    var mostrado= document.getElementById("consultar");
    if(mostrado!=null){
      mostrado.style.display = "flex";
    }
  }
  
  getImageUrl(activity: any) {
    if (activity.imagen && activity.imagen.originalName) {
      const imageUrl = `http://localhost:3000/uploads/${activity.imagen.originalName}`;
      return imageUrl;
    } else {
      return '';
    }
  }
  
  deleteActivity(activity: any) {
    if (window.confirm('¿Estás seguro de que quieres eliminar la actividad?')) {
      this.crudService.DeleteActivities(activity._id).subscribe((res) => {
        console.log(res)
        this.Activities = res;
        window.alert("Actividad eliminada correctamente");
        location.reload();
      })
    }
  }
  
  modificar(activity: any){
    this.crudService.selectedActivity.next(activity);
    this.router.navigate(['/updateActivities', activity._id]);
    this.activity=activity;
    var escondido= document.getElementById("escondido");
    if(escondido!=null){
      escondido.style.display = "none";
    }
    var modificar= document.getElementById("modificarForm");
    if(modificar!=null){
      modificar.style.display = "flex";
    }
    var mostrado= document.getElementById("consultar");
    if(mostrado!=null){
      mostrado.style.display = "none";
    }
  }


  filtrar(event: any) {
    const filtroPrecio = (document.getElementById("filtrarPorPrecio") as HTMLSelectElement).value;
    const filtroDificultad = (document.getElementById("filtrarPorDificultad") as HTMLSelectElement).value;
    const checkboxes = document.getElementsByName("categoria");
    const seleccionados: string[] = [];
    
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i] as HTMLInputElement;
        if (checkbox.checked) {
            seleccionados.push(checkbox.value);
        }
    }
    
    let activitiesToDisplay = this.Activities;
    
    if (filtroPrecio === 'asc') {
        activitiesToDisplay = activitiesToDisplay.sort((a: Activity, b: Activity) => parseInt(a.precio) - parseInt(b.precio));
    } else if (filtroPrecio === 'desc') {
        activitiesToDisplay = activitiesToDisplay.sort((a: Activity, b: Activity) => parseInt(b.precio) - parseInt(a.precio));
    }
    
    if (filtroDificultad !== 'seleccionar') {
        activitiesToDisplay = activitiesToDisplay.filter((activity: Activity) => activity.dificultad === filtroDificultad);
    }
    
    if (seleccionados.length > 0) {
        activitiesToDisplay = activitiesToDisplay.filter((activity: Activity) => seleccionados.includes(activity.categoria));
    }
    
    this.ActivitiesToDisplay = activitiesToDisplay;
  }

}