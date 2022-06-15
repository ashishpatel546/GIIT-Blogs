import { Module } from '@nestjs/common';
// import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
// import { UserService } from 'src/user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
