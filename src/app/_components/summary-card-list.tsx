import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CircleDollarSign,
  SquareCheckBig,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { SiAsana, SiGoogleanalytics, SiStripe } from "react-icons/si";

export default function SummaryCardList() {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <Link
        href="https://analytics.google.com/analytics/web/#/p386284603/reports/reportinghub"
        target="_blank"
      >
        <Card className="group p-4 hover:border-orange-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">月間PV</CardTitle>
            <SiGoogleanalytics size={24} />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold group-hover:text-orange-400">
              5730
            </span>
            <p className="text-xs text-muted-foreground">+201 前日比</p>
          </CardContent>
        </Card>
      </Link>

      <Link
        href="https://analytics.google.com/analytics/web/#/p386284603/reports/reportinghub"
        target="_blank"
      >
        <Card className="group p-4 hover:border-orange-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新規登録</CardTitle>
            <UserPlus size={24} />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold group-hover:text-orange-400">
              +235
            </span>
            <p className="text-xs text-muted-foreground">+180.1% 先月比</p>
          </CardContent>
        </Card>
      </Link>

      <Link href="https://dashboard.stripe.com/dashboard" target="_blank">
        <Card className="group p-4 hover:border-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">月間総売上</CardTitle>
            <SiStripe size={24} />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold group-hover:text-indigo-500">
              ￥45,231
            </span>
            <p className="text-xs text-muted-foreground">+20.1% 先月比</p>
          </CardContent>
        </Card>
      </Link>

      <Link
        href="https://app.asana.com/0/1206817121238028/1206818071106072"
        target="_blank"
      >
        <Card className="group p-4 hover:border-red-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">月間タスク</CardTitle>
            <SiAsana size={24} />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold group-hover:text-red-400">
              24 / 60
            </span>
            <p className="text-xs text-muted-foreground">+19 前日比</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
