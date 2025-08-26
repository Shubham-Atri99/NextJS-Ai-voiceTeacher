import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
  color: string;
}

interface CompanionListProps {
  title: string;
  companions?: Session[];
  classNames?: string;
}

const CompanionList = ({ title, companions, classNames }: CompanionListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <Table className="w-full">
        <TableCaption>A list of your recent sessions.</TableCaption>
        <TableHeader>
          <TableRow className="h-14"> {/* Increase header height */}
            <TableHead>Companion</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead className="text-right">Duration (mins)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.length ? (
            companions.map((companion) => (
              <TableRow key={companion.id} className="hover:bg-gray-50 h-16"> 
                {/* ↑ Increased row height (16 = 64px) */}
                <TableCell className="py-4">
                  <Link
                    href={`/companions/${companion.id}`}
                    className="flex items-center gap-2 text-blue-600 hover:underline font-medium"
                  >
                    <Image
                      src={`/icons/${companion.subject}.svg`}
                      alt={companion.subject}
                      width={28}
                      height={28}
                      className="rounded"
                    />
                    {companion.name}
                  </Link>
                </TableCell>

                <TableCell className="capitalize py-4">{companion.subject}</TableCell>
                <TableCell className="py-4">{companion.topic}</TableCell>
                <TableCell className="text-right py-4">{companion.duration}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="h-16">
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                No sessions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionList;
