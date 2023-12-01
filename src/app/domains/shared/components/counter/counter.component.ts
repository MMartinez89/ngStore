import { Component, Input, SimpleChange, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { repeat } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  //host: {ngSkipHydration: 'true'},
})
export class CounterComponent {

  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef: number | undefined;


  constructor(){
    //before render
    console.log('contructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: any) {
    //before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    console.log(duration);
    if(duration){
      this.doSometing();
    }
  }

  ngOnInit(): void {
    //after render
    //una vez
    //se usa usa async
    console.log('ngOnInit'); 
    console.log('-'.repeat(10));
    console.log('duration => ', this.duration);
    console.log('message => ', this.message);
    if(typeof window !== 'undefined'){
      this.counterRef = window.setInterval(()=>{
        console.log('run interval');
        this.counter.update(statePrev => statePrev + 1);
      }, 1000);
    }
    
  }

  ngAfterViewInit(): void {
    //after render
    // hijos del componentes ya fueron renderiados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy(): void {
    //Cuando el componente se destruye
    console.log("ngOnDestroy");
    //window.clearInterval(this.counterRef);
    let value
    if (typeof window !== 'undefined') {
      value = window.clearInterval(this.counterRef);
    }
  }

  doSometing(){
    console.log('change duration');
  }
}
