// featured-products.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FeaturedProductsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set query param for featured
    req.query.featured = 'true';
    next();
  }
}
