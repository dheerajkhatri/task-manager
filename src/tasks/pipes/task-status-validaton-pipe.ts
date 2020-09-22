import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatues = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if(!this.isValidStatus(value)) {
            throw new BadRequestException(`${value} is invalid status`);
        }
        return value;
    }

    private isValidStatus(status: any) {
        const idx = this.allowedStatues.indexOf(status);
        return idx != -1;
    }

}