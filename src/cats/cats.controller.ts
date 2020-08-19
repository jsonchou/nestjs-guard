/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Param, Post, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { USER_TOKEN_NAME } from '../common/constants/index'

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/login')
  async login(@Res() res: Response, @Req() req: Request) {
    res.cookie(USER_TOKEN_NAME, 'jsonchou', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, signed: true });
    res.send({
      username: 'jsonchou',
      // username: req.signedCookies[USER_TOKEN_NAME],
    })
  }

  @Get('/my')
  @Roles('owner') //owner 才可以访问本页面
  async create(@Req() req: Request, @Res() res: Response) {
    console.log('my', req.signedCookies[USER_TOKEN_NAME])
    res.send({
      dax: 2333,
      d: 1
    })
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id', new ParseIntPipe()) id: number) {
    console.log(444, req.signedCookies[USER_TOKEN_NAME])
    const data = this.catsService.findOne(id)
    return data
  }

}
