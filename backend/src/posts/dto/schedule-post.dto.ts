import { ApiProperty } from '@nestjs/swagger';

export class SchedulePostDto {
    @ApiProperty({ example: '2023-12-25T10:00:00Z', description: 'Scheduled date and time' })
    scheduledFor: Date;
}
