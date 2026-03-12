import { prisma } from "@/lib/prisma";

interface PostingLine { accountCode: string; debit?: number; credit?: number; description?: string }

export async function postJournal(companyId: string, sourceType: string, sourceId: string, lines: PostingLine[], memo?: string) {
  const debit = lines.reduce((acc, line) => acc + (line.debit ?? 0), 0);
  const credit = lines.reduce((acc, line) => acc + (line.credit ?? 0), 0);
  if (Number(debit.toFixed(2)) !== Number(credit.toFixed(2))) throw new Error("Unbalanced posting");

  const count = await prisma.journalEntry.count({ where: { companyId } });
  return prisma.journalEntry.create({
    data: {
      companyId,
      journalNo: `JRN-${String(count + 1).padStart(6, "0")}`,
      date: new Date(),
      sourceType,
      sourceId,
      memo,
      lines: {
        create: await Promise.all(lines.map(async (line) => {
          const account = await prisma.account.findFirst({ where: { companyId, code: line.accountCode, isActive: true } });
          if (!account) throw new Error(`Invalid account ${line.accountCode}`);
          return { accountId: account.id, description: line.description, debit: line.debit ?? 0, credit: line.credit ?? 0 };
        }))
      }
    }
  });
}

export async function postInvoice(companyId: string, sourceId: string, subtotal: number, tax = 0) {
  return postJournal(companyId, "INVOICE", sourceId, [
    { accountCode: "1100", debit: subtotal + tax, description: "Accounts receivable" },
    { accountCode: "4000", credit: subtotal, description: "Revenue" },
    ...(tax > 0 ? [{ accountCode: "2100", credit: tax, description: "Output VAT" }] : [])
  ]);
}
