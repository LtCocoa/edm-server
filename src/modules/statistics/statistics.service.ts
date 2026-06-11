import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../documents/entities/document.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRoleKey } from '../../shared/enums/user-role-key.enum';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
  ) {}

  async getReviewers() {
    try {
      const result = await this.usersRepository.createQueryBuilder('reviewer')
        .leftJoin('reviewer.reviewDocuments', 'document')
        .leftJoin('document.status', 'status')
        .leftJoin('reviewer.role', 'role')
        .where('role.key = :key', {
          key: UserRoleKey.MANAGER
        })
        .select('reviewer.id', 'reviewerId')
        .addSelect('reviewer.firstName', 'reviewerName')
        .addSelect("COUNT(*) FILTER (WHERE status.key = 'pending')", 'pending')
        .addSelect("COUNT(*) FILTER (WHERE status.key = 'approved')", 'approved')
        .addSelect("COUNT(*) FILTER (WHERE status.key = 'rejected')", 'rejected')
        .groupBy('reviewer.id')
        .addGroupBy('reviewer.firstName')
        .getRawMany();
      return result;
    } catch (err) {
      throw new InternalServerErrorException('Error while processing request');
    }
  }

  async getDocumentsByMonth(startDateString: string, endDateString: string) {
    const [
      startDate,
      endDate
    ] = [
      new Date(startDateString).toLocaleDateString('sv'),
      new Date(endDateString).toLocaleDateString('sv'),
    ];

    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    const result = await this.documentsRepository.query(`
      SELECT
        TO_CHAR(months.month, 'YYYY-MM') AS month,
        COUNT(document.id) AS "documentsCreated"
      FROM generate_series(
        $1::date,
        $2::date,
        interval '1 month'
      ) AS months(month)

      LEFT JOIN documents document
        ON DATE_TRUNC('month', document.created_at) = months.month
      LEFT JOIN statuses status
        ON document.status_id = status.id

      GROUP BY months.month
      ORDER BY months.month;
    `,
    [
      startDate,
      endDate,
    ]);

    return result;
  }
}
