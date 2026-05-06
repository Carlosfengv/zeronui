import { Card, CardContent, CardHeader, CardTitle } from "@zeron-ui/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zeron-ui/ui/tabs";

export default function TabsExample() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent className="mt-4" value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Track progress across active projects and pending tasks.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent className="mt-4" value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Compare visits, conversion, and retention trends.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent className="mt-4" value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Export weekly summaries for the whole team.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
