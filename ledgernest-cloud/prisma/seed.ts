import { PrismaClient, RoleName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.upsert({
    where: { id: "demo-company" },
    update: {},
    create: {
      id: "demo-company",
      name: "LedgerNest Demo Industries",
      baseCurrency: "USD"
    }
  });

  const user = await prisma.user.upsert({
    where: { email: "admin@ledgernest.cloud" },
    update: {},
    create: {
      email: "admin@ledgernest.cloud",
      name: "Demo Admin",
      passwordHash: "demo-admin-123"
    }
  });

  await prisma.membership.upsert({
    where: { userId_companyId: { userId: user.id, companyId: company.id } },
    update: {},
    create: { userId: user.id, companyId: company.id, role: RoleName.COMPANY_ADMIN }
  });

  const coa = [
    ["1000", "Cash", "ASSETS"],
    ["1010", "Bank", "ASSETS"],
    ["1100", "Accounts Receivable", "ASSETS"],
    ["2000", "Accounts Payable", "LIABILITIES"],
    ["2100", "VAT Output", "LIABILITIES"],
    ["1200", "VAT Input", "ASSETS"],
    ["3000", "Owner Equity", "EQUITY"],
    ["4000", "Service Revenue", "INCOME"],
    ["5000", "Cost of Sales", "COST_OF_SALES"],
    ["6100", "Office Expenses", "OPERATING_EXPENSES"],
    ["6200", "Utilities", "OPERATING_EXPENSES"],
    ["7000", "Other Expenses", "OTHER_EXPENSES"]
  ] as const;

  for (const [code, name, cls] of coa) {
    await prisma.account.upsert({
      where: { companyId_code: { companyId: company.id, code } },
      update: {},
      create: {
        companyId: company.id,
        code,
        name,
        class: cls,
        detailType: "General",
        normalBalance: ["ASSETS", "COST_OF_SALES", "OPERATING_EXPENSES", "OTHER_EXPENSES"].includes(cls) ? "DEBIT" : "CREDIT",
        isSystem: ["1100", "2000", "2100", "1200"].includes(code)
      }
    });
  }

  for (let i = 1; i <= 15; i += 1) {
    await prisma.customer.create({
      data: {
        companyId: company.id,
        displayName: `Customer ${i}`,
        email: `customer${i}@example.com`
      }
    });
  }

  for (let i = 1; i <= 10; i += 1) {
    await prisma.vendor.create({
      data: {
        companyId: company.id,
        name: `Vendor ${i}`,
        email: `vendor${i}@example.com`
      }
    });
  }

  for (let i = 1; i <= 25; i += 1) {
    await prisma.productService.create({
      data: {
        companyId: company.id,
        name: `Service Item ${i}`,
        sku: `SVC-${String(i).padStart(3, "0")}`,
        type: i % 3 === 0 ? "non-inventory" : "service",
        salesPrice: 45 + i,
        cost: 10 + i / 2
      }
    });
  }

  await prisma.bankAccount.createMany({
    data: [
      { companyId: company.id, name: "Main Operating Bank", accountType: "BANK", currency: "USD", maskedNumber: "****1234", openingBalance: 25000 },
      { companyId: company.id, name: "Petty Cash", accountType: "CASH", currency: "USD", maskedNumber: "CASH", openingBalance: 1200 }
    ],
    skipDuplicates: true
  });

  await prisma.taxRate.create({
    data: { companyId: company.id, name: "Standard VAT", rate: 15, type: "VAT" }
  });

  console.log("Demo data seeded. Login: admin@ledgernest.cloud / demo-admin-123");
}

main().finally(async () => prisma.$disconnect());
