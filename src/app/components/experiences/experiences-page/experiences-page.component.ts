import { Component } from '@angular/core';
interface Experience {
  content: string;
  header: string;
  date: string;
}

@Component({
  selector: 'app-experiences-page',
  templateUrl: './experiences-page.component.html',
  styleUrls: ['./experiences-page.component.scss'],
})
export class ExperiencesPageComponent {
  public experiences: Experience[] = [
    {
      header: 'Umbrage - Associate Software Engineer',
      date: 'December 2019 - Present Day!',
      content:
       'Associate Software Engineer at Umbrage. Creating innovation solutions for clients. Angular, Node, GraphQL, Docker, .Net Core, and whatever else we need to get the job done.',
    },
    {
      header: 'Accenture Digital Products - Web Developer',
      date: 'June 2018 - December 2019!',
      content:
        'Accenture hired me on as a Web Developer. I work on tons of different projects and work with great people at the Houston Innovation Hub.',
    },
    {
      header: 'UC San Diego Extension Coding Bootcamp',
      date: '2017-2018',
      content:
        'I graduated from a Coding Bootcamp where I learned the professional skills needed to begin a career in Web Development.',
    },
    {
      header: 'Unix & Linux Systems Adminstration',
      date: '2014',
      content:
        'I completed a certification from UC San Diego Extension in Unix & Linux Systems Administration. I learned a ton about the command line and ways to help secure linux servers.',
    },
    {
      header: 'Command Line Utilities & Android Apps',
      date: '2011-2018',
      content:
        'I spent a year at UC Santa Cruz studying Computer Science & Game Design, during this time I created command line utilities and Android apps that sold in the Google Play Store. I sold them under the Batakang company, which I ran by myself until 2018 when I shut it down. My most popular app was Universal Unroot with 100,000+ installs.',
    },
    {
      header: 'Myspace & Neopets',
      date: '2004',
      content: 'Created websites for friends in HTML and CSS',
    },
  ];
}
