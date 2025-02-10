import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
// import { ServiceKeyGuard } from '../auth/guards/security.guard';
import { PlanDto, SubscribeDto } from './dto/subscription.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Subscription')
@Controller('subscriptions')
// @UseGuards(ServiceKeyGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('create-plan')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create a new subscription plan' })
  async createPlan(@Body() planData: PlanDto) {
    return this.subscriptionService.createPlan(planData);
  }

  @Get('get-plans')
  @ApiOperation({ description: 'Get all active subscription plans' })
  async getPlans() {
    return this.subscriptionService.getPlans();
  }

  @Post('subscribe')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Subscribe to a plan' })
  async subscribe(@Request() req: any, @Body() subscribe: SubscribeDto) {
    return this.subscriptionService.subscribe(
      req.user.userId,
      subscribe.planId,
      subscribe.monthDuration,
    );
  }
}
