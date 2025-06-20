import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type returnDataDto = {
    success: boolean;
    data: any;
    paginate?: number;
    refresh?: boolean;
};

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<returnDataDto> | Promise<Observable<returnDataDto>> {
        return next.handle().pipe(
            map((data) => {
                if (data && data.paginate && data.data) {
                    if (data.paginate.limit) {
                        return {
                            success: true,
                            data: data.data,
                            paginate: data.paginate,
                            refresh: data.refresh,
                            status: 200,
                        };
                    } else {
                        data.paginate['limit'] = 20;
                        return {
                            success: true,
                            data: data.data,
                            paginate: data.paginate,
                            refresh: data.refresh,
                            status: 200,
                        };
                    }
                } else if (data && data.refresh) {
                    return {
                        success: true,
                        data: data.data,
                        refresh: data.refresh,
                        status: 200,
                    };
                }
                return {
                    success: true,
                    data: data,
                    status: 200,
                };
            }),
        );
    }
}
