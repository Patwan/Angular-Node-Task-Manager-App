import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  listId: string;
  
  ngOnInit() {
    //Subscribe to the parameters changing in the route URL and get the listId
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  createTask(title: string) {
    //Create the task and pass the title and listId we extracted from the route above.
    //We then subscribe/listen to the observable we get.
    this.taskService.createTask(title, this.listId).subscribe((newTask: Task) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }

}

