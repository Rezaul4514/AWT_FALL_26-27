import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    try {
      return await this.employeesRepository.save(this.employeesRepository.create(dto));
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Could not save employee. The email may already exist.');
      }
      throw error;
    }
  }

  findAll() {
    return this.employeesRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const employee = await this.employeesRepository.findOneBy({ id });
    if (!employee) throw new NotFoundException(`Employee with ID ${id} not found`);
    return employee;
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);
    Object.assign(employee, dto);
    try {
      return await this.employeesRepository.save(employee);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Could not update employee. The email may already exist.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employeesRepository.remove(employee);
    return { message: `Employee ${id} deleted successfully` };
  }
}
