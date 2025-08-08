import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.announcement.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.grade.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.studentClass.deleteMany()
  await prisma.class.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Create admin user
  const adminPassword = await bcrypt.hash('password123', 12)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
    },
  })

  // Create teacher users
  const teacherPassword = await bcrypt.hash('password123', 12)
  const teachers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'teacher@demo.com',
        password: teacherPassword,
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'TEACHER',
        teacherId: 'T001',
        department: 'Mathematics',
        qualification: 'M.Sc. Mathematics',
        hireDate: new Date('2020-08-01'),
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'teacher2@demo.com',
        password: teacherPassword,
        firstName: 'Michael',
        lastName: 'Chen',
        role: 'TEACHER',
        teacherId: 'T002',
        department: 'Physics',
        qualification: 'Ph.D. Physics',
        hireDate: new Date('2019-09-01'),
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'teacher3@demo.com',
        password: teacherPassword,
        firstName: 'Emily',
        lastName: 'Davis',
        role: 'TEACHER',
        teacherId: 'T003',
        department: 'English',
        qualification: 'M.A. English Literature',
        hireDate: new Date('2021-01-15'),
        isActive: true,
      },
    }),
  ])

  // Create student users
  const studentPassword = await bcrypt.hash('password123', 12)
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'student@demo.com',
        password: studentPassword,
        firstName: 'John',
        lastName: 'Doe',
        role: 'STUDENT',
        studentId: 'S001',
        grade: 10,
        section: 'A',
        parentName: 'Jane Doe',
        parentPhone: '+1234567890',
        emergencyContact: '+1234567891',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'student2@demo.com',
        password: studentPassword,
        firstName: 'Alice',
        lastName: 'Smith',
        role: 'STUDENT',
        studentId: 'S002',
        grade: 11,
        section: 'B',
        parentName: 'Bob Smith',
        parentPhone: '+1234567892',
        emergencyContact: '+1234567893',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'student3@demo.com',
        password: studentPassword,
        firstName: 'David',
        lastName: 'Wilson',
        role: 'STUDENT',
        studentId: 'S003',
        grade: 9,
        section: 'C',
        parentName: 'Carol Wilson',
        parentPhone: '+1234567894',
        emergencyContact: '+1234567895',
        isActive: true,
      },
    }),
  ])

  // Create classes
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        name: 'Grade 10A',
        grade: 10,
        section: 'A',
        academicYear: '2024-2025',
        teacherId: teachers[0].id,
      },
    }),
    prisma.class.create({
      data: {
        name: 'Grade 11B',
        grade: 11,
        section: 'B',
        academicYear: '2024-2025',
        teacherId: teachers[1].id,
      },
    }),
    prisma.class.create({
      data: {
        name: 'Grade 9C',
        grade: 9,
        section: 'C',
        academicYear: '2024-2025',
        teacherId: teachers[2].id,
      },
    }),
  ])

  // Create subjects
  const subjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Mathematics',
        code: 'MATH101',
        description: 'Advanced Mathematics for Grade 10',
        classId: classes[0].id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Physics',
        code: 'PHYS101',
        description: 'Introduction to Physics',
        classId: classes[1].id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'English Literature',
        code: 'ENG101',
        description: 'English Literature and Composition',
        classId: classes[2].id,
      },
    }),
  ])

  // Assign students to classes
  await Promise.all([
    prisma.studentClass.create({
      data: {
        studentId: students[0].id,
        classId: classes[0].id,
      },
    }),
    prisma.studentClass.create({
      data: {
        studentId: students[1].id,
        classId: classes[1].id,
      },
    }),
    prisma.studentClass.create({
      data: {
        studentId: students[2].id,
        classId: classes[2].id,
      },
    }),
  ])

  // Create grades
  await Promise.all([
    prisma.grade.create({
      data: {
        studentId: students[0].id,
        subjectId: subjects[0].id,
        teacherId: teachers[0].id,
        grade: 92,
        maxGrade: 100,
        type: 'Midterm',
        date: new Date('2024-01-15'),
        comments: 'Excellent work on algebraic expressions',
      },
    }),
    prisma.grade.create({
      data: {
        studentId: students[1].id,
        subjectId: subjects[1].id,
        teacherId: teachers[1].id,
        grade: 88,
        maxGrade: 100,
        type: 'Lab Report',
        date: new Date('2024-01-12'),
        comments: 'Good understanding of Newton\'s laws',
      },
    }),
    prisma.grade.create({
      data: {
        studentId: students[2].id,
        subjectId: subjects[2].id,
        teacherId: teachers[2].id,
        grade: 95,
        maxGrade: 100,
        type: 'Essay',
        date: new Date('2024-01-10'),
        comments: 'Outstanding analysis of Shakespeare\'s work',
      },
    }),
  ])

  // Create attendance records
  await Promise.all([
    prisma.attendance.create({
      data: {
        studentId: students[0].id,
        classId: classes[0].id,
        teacherId: teachers[0].id,
        date: new Date('2024-01-15'),
        status: 'present',
        remarks: null,
      },
    }),
    prisma.attendance.create({
      data: {
        studentId: students[1].id,
        classId: classes[1].id,
        teacherId: teachers[1].id,
        date: new Date('2024-01-15'),
        status: 'present',
        remarks: null,
      },
    }),
    prisma.attendance.create({
      data: {
        studentId: students[2].id,
        classId: classes[2].id,
        teacherId: teachers[2].id,
        date: new Date('2024-01-15'),
        status: 'late',
        remarks: 'Arrived 10 minutes late',
      },
    }),
  ])

  // Create announcements
  await Promise.all([
    prisma.announcement.create({
      data: {
        title: 'Welcome to the New Academic Year',
        content: 'Welcome back students! We hope you had a great summer break. Please check your class schedules and be ready for an exciting year ahead.',
        authorId: admin.id,
        isPublic: true,
        targetClass: null,
      },
    }),
    prisma.announcement.create({
      data: {
        title: 'Mathematics Assignment Due',
        content: 'The algebra assignment is due next Friday. Please submit your work through the online portal.',
        authorId: teachers[0].id,
        isPublic: false,
        targetClass: 'Grade 10A',
      },
    }),
    prisma.announcement.create({
      data: {
        title: 'Parent-Teacher Meeting',
        content: 'Parent-teacher meetings will be held next week. Please check the schedule for your assigned time slot.',
        authorId: admin.id,
        isPublic: true,
        targetClass: null,
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log('\n📋 Demo Credentials:')
  console.log('Admin: admin@demo.com / password123')
  console.log('Teacher: teacher@demo.com / password123')
  console.log('Student: student@demo.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
