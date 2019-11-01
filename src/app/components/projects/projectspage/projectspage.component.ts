import { Component } from '@angular/core';

interface Project {
  header: string;
  company: string;
  content: string;
  tools: string[];
}

@Component({
  selector: 'app-projectspage',
  templateUrl: './projectspage.component.html',
  styleUrls: ['./projectspage.component.scss'],
})
export class ProjectspageComponent {
  public entries: Project[] = [
    {
      header: 'Intrepid Project 5',
      company: 'Global Oil & Gas Company',
      content: `Leading the Development team on a cross-geographic project that involves .NET Core, React, React Native, Redux, Azure SQL, Azure Data Factory, and Azure Functions. I help with all asking of Product Development and consult with the client on a regular basis. This project and client use the SAFe methodology.`,
      tools: ['react', 'typescript', 'nodejs', 'git', 'dotnetcore'],
    },
    {
      header: 'Intrepid Project 4',
      company: 'Global Oil & Gas Company',
      content: `Created an MVP in React Typescript and Electron as the sole developer on an internal project for the purpose of presenting our solution to the client, in hopes of winning a bid. I used an OCR API to convert scanned pdfs into excel files to automate the process of digitizing records. Backend was written in Node.`,
      tools: ['react', 'typescript', 'azure', 'nodejs', 'sass', 'git'],
    },
    {
      header: 'Intrepid Project 3',
      company: 'Interal Project',
      content: `Worked with an offshore team to migrate an AngularJS app to Angular 5, using another Angular 5 project as a baseline, to share components and auth services. I was the only onshore developer. Created technical requirements when none were provided. Estimated work and assigned User Stories to the offshore team and myself. This project involved creating a custom triple-level accordion table component, as a centerpiece to the events management portions of the app. Backend was written in Java, though the offshore team managed that codebase.`,
      tools: ['angular', 'aws', 'java', 'typescript', 'nodejs', 'sass', 'git'],
    },
    {
      header: 'Intrepid Project 2',
      company: 'Global Oil & Gas Company',
      content: `Worked on an existing Angular 6 app and wore many hats as the only onshore developer. Created technical requirements when none were provided. Estimated work and assigned User Stories to the offshore team and myself. Backend was written in Java, though the offshore team managed that codebase.`,
      tools: ['angular', 'aws', 'java', 'typescript', 'nodejs', 'sass', 'git'],
    },
    {
      header: 'Intrepid Project 1',
      company: 'Interal Project',
      content: `Full-Stack developer. Worked on Angular6 front-end and Node.js back-end, utilizing PostgreSQL with Sequelize. Involved in setting up websocket communication and REST APIs.`,
      tools: [
        'angular',
        'heroku',
        'postgres',
        'typescript',
        'nodejs',
        'sass',
        'git',
      ],
    },
  ];
}
