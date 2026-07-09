const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const notices = [
  {
    title: "Mid-term examination schedule released",
    body: "The mid-term examination timetable for all departments has been published. Students must check their respective portals for exact dates, hall allocations, and reporting times. Admit cards will be issued one week before the first paper.",
    category: "Exam",
    priority: "Urgent",
    publishDate: new Date("2026-07-08"),
    image: null,
  },
  {
    title: "Campus Wi-Fi maintenance tonight",
    body: "Network services across all hostels and academic blocks will be temporarily unavailable between 11 PM and 2 AM tonight for scheduled maintenance. We apologize for any inconvenience this may cause.",
    category: "General",
    priority: "Urgent",
    publishDate: new Date("2026-07-09"),
    image: null,
  },
  {
    title: "Annual Tech Fest — registrations open",
    body: "Registrations for this year's Annual Tech Fest are now open. Expect workshops, hackathons, a robotics showcase, and guest talks from industry professionals across three action-packed days.",
    category: "Event",
    priority: "Normal",
    publishDate: new Date("2026-07-05"),
    image: null,
  },
  {
    title: "Library extended hours during exam season",
    body: "The central library will remain open until midnight throughout the examination period to support focused study sessions. Group discussion rooms can be booked via the library portal.",
    category: "General",
    priority: "Normal",
    publishDate: new Date("2026-07-03"),
    image: null,
  },
  {
    title: "Guest lecture: Careers in Applied AI",
    body: "Join us for a guest lecture on career pathways in applied artificial intelligence, featuring alumni currently working at leading research labs and startups. Open to all years.",
    category: "Event",
    priority: "Normal",
    publishDate: new Date("2026-06-28"),
    image: null,
  },
  {
    title: "Semester fee payment deadline reminder",
    body: "Students who have not yet cleared their semester fees are reminded that the final payment deadline is approaching. Late payments will incur a fine as per the academic handbook.",
    category: "General",
    priority: "Normal",
    publishDate: new Date("2026-06-20"),
    image: null,
  },
];

async function main() {
  console.log("Seeding database…");
  await prisma.notice.deleteMany();
  await prisma.notice.createMany({ data: notices });
  console.log(`Seeded ${notices.length} notices.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
