import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/users/interfaces/user';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data.lenght > 1) {
          return data.map((user: User) =>
            user.lastName == undefined ? { ...user, lastName: null } : user,
          );
        }
        return data.lastname === undefined ? { ...data, lastname: null } : data;
      }),
    );
  }
}
