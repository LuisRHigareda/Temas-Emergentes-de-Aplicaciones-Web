import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

interface Clase {
  id: number;
  nombre: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}