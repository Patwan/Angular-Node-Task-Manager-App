import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  selectedListId: string;

  constructor(private taskService: TaskService, 
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit() {
    //Subscribe to the Observable whnever we click on a routerLink and get the list id
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          //Fetch all tasks from the backend by fetching the id of a list that was clicked
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )
    
    //Subscribe to Observable of all lists gotten from the backend and populate in lists array
    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
    
  }

  onTaskClick(task: Task) {
    //Pass the task Object to the backend once its is clicked on U.I
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }

}
