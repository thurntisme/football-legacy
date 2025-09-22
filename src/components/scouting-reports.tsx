'use client';

import { useState } from 'react';

import {
  AlertTriangle,
  Clipboard,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  Share2,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

type ScoutingReport = {
  id: number;
  title: string;
  teamName: string;
  date: string;
  author: string;
  type: 'team' | 'player' | 'match';
  subject: string;
  rating: number; // 1-10
  summary: string;
  details: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  recommendations: string[];
  status: 'new' | 'reviewed' | 'archived';
};

interface ScoutingReportsProps {
  activeTeam: string | null;
}

export default function ScoutingReports({ activeTeam }: ScoutingReportsProps) {
  const [reports, setReports] = useState<ScoutingReport[]>([
    {
      id: 1,
      title: 'Manchester City Pre-Match Analysis',
      teamName: 'Manchester City',
      date: '2025-03-10',
      author: 'James Wilson',
      type: 'team',
      subject: 'Manchester City',
      rating: 8,
      summary:
        "Comprehensive analysis of Manchester City's tactics, strengths, and weaknesses ahead of our upcoming match.",
      details: {
        strengths: [
          'Exceptional ball retention and circulation',
          'Positional rotations to create overloads',
          'High pressing to win ball in advanced areas',
          'Creative midfielders who can unlock defenses',
        ],
        weaknesses: [
          'Vulnerable to counter-attacks when fullbacks advance',
          'Can struggle against low blocks that deny space',
          'Set piece defending has shown inconsistencies',
        ],
        opportunities: [
          'Exploit space behind advancing fullbacks',
          'Quick transitions when possession is won',
          'Set pieces could be a source of goals',
        ],
        threats: [
          "De Bruyne's passing range and vision",
          "Haaland's finishing and movement in the box",
          "Rodri's control of midfield tempo",
        ],
      },
      recommendations: [
        'Maintain compact defensive shape to limit space between lines',
        'Prepare quick counter-attacking strategies when possession is won',
        'Focus on set piece preparation both offensively and defensively',
        'Consider man-marking De Bruyne in dangerous areas',
      ],
      status: 'new',
    },
    {
      id: 2,
      title: 'Kevin De Bruyne Player Analysis',
      teamName: 'Manchester City',
      date: '2025-03-08',
      author: 'Carlos Mendez',
      type: 'player',
      subject: 'Kevin De Bruyne',
      rating: 9,
      summary:
        "Detailed analysis of Kevin De Bruyne's playing style, strengths, and how to limit his influence.",
      details: {
        strengths: [
          'Elite vision and passing range',
          'Exceptional crossing ability',
          'Dangerous from set pieces',
          'Intelligent movement between lines',
        ],
        weaknesses: [
          'Can be pressed intensely to limit time on ball',
          'Defensive work rate can be exploited',
          'Occasional injury concerns affect consistency',
        ],
        opportunities: [
          'Pressure him immediately when receiving the ball',
          'Force him to defend more to drain energy',
          'Limit space between defensive and midfield lines',
        ],
        threats: [
          'Through balls that split defenses',
          'Long-range shooting ability',
          'Set piece delivery',
          'Late runs into the box',
        ],
      },
      recommendations: [
        'Assign a specific midfielder to track his movements',
        'Apply immediate pressure when he receives the ball',
        'Maintain compact shape to limit passing lanes',
        'Force him to play backward and sideways rather than forward',
      ],
      status: 'reviewed',
    },
    {
      id: 3,
      title: 'Liverpool vs Chelsea Match Analysis',
      teamName: 'Liverpool',
      date: '2025-02-15',
      author: 'David Thompson',
      type: 'match',
      subject: 'Liverpool vs Chelsea',
      rating: 7,
      summary:
        "Analysis of Liverpool's recent match against Chelsea, highlighting tactical approaches and key moments.",
      details: {
        strengths: [
          'Effective high pressing in first 30 minutes',
          "Salah's movement creating overloads on right side",
          'Quick transitions from defense to attack',
          'Set piece effectiveness',
        ],
        weaknesses: [
          'Vulnerable to counter-attacks through central areas',
          'Midfield struggled to control tempo after 60 minutes',
          'High defensive line exploited several times',
        ],
        opportunities: [
          'Target space behind their high defensive line',
          'Press their central midfielders to disrupt build-up',
          'Exploit set pieces as Chelsea conceded multiple corners',
        ],
        threats: [
          "Salah's pace and finishing ability",
          "Alexander-Arnold's crossing from deep positions",
          "Van Dijk's aerial dominance at both ends",
        ],
      },
      recommendations: [
        'Prepare quick transitions to exploit their high line',
        'Focus on maintaining possession to limit their counter-pressing',
        'Consider man-marking Salah in dangerous areas',
        'Prepare specific set piece routines targeting their weaknesses',
      ],
      status: 'archived',
    },
    {
      id: 4,
      title: 'Bayern Munich Tactical Analysis',
      teamName: 'Bayern Munich',
      date: '2025-02-28',
      author: 'Hiroshi Tanaka',
      type: 'team',
      subject: 'Bayern Munich',
      rating: 8,
      summary:
        "Comprehensive breakdown of Bayern Munich's tactical approach, formation, and playing style.",
      details: {
        strengths: [
          'Direct attacking play with quick vertical passes',
          'Excellent wing play with overlapping fullbacks',
          'Strong physical presence in midfield and attack',
          'Clinical finishing from multiple positions',
        ],
        weaknesses: [
          'High defensive line can be exploited with pace',
          'Transition defense vulnerable when fullbacks advance',
          'Can struggle against teams that deny space and counter',
        ],
        opportunities: [
          'Quick transitions targeting space behind fullbacks',
          'Compact defensive shape to frustrate their build-up',
          'Set pieces against their zonal marking system',
        ],
        threats: [
          "Kane's finishing and link-up play",
          "Kimmich's passing range from deep",
          "Musiala's dribbling and creativity in final third",
        ],
      },
      recommendations: [
        'Prepare counter-attacking strategy focusing on wide areas',
        'Maintain disciplined defensive shape to limit space',
        'Consider double-teaming their wingers to limit crossing',
        'Focus on defensive transitions when possession is lost',
      ],
      status: 'new',
    },
    {
      id: 5,
      title: 'Harry Kane Player Analysis',
      teamName: 'Bayern Munich',
      date: '2025-02-25',
      author: 'Samuel Osei',
      type: 'player',
      subject: 'Harry Kane',
      rating: 9,
      summary:
        "Detailed analysis of Harry Kane's playing style, movement patterns, and goal-scoring abilities.",
      details: {
        strengths: [
          'Elite finishing with both feet',
          'Exceptional link-up play and passing',
          'Intelligent movement to create space',
          'Aerial threat from crosses and set pieces',
        ],
        weaknesses: [
          'Lack of explosive pace',
          'Can be isolated if support is limited',
          'Defensive contribution when pressing',
        ],
        opportunities: [
          'Tight marking to limit time on the ball',
          'Cut off passing lanes to supporting players',
          'Force him to defend more to drain energy',
        ],
        threats: [
          'Clinical finishing from various distances',
          'Ability to drop deep and play killer passes',
          'Set piece expertise',
          'Late runs into the box',
        ],
      },
      recommendations: [
        'Assign a specific defender to track his movements',
        'Maintain compact defensive shape to limit space between lines',
        'Cut off service from wide areas and midfield',
        'Be alert to his movement when defending set pieces',
      ],
      status: 'reviewed',
    },
  ]);

  const [selectedReport, setSelectedReport] = useState<ScoutingReport | null>(
    null
  );
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState(activeTeam || 'all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('summary');

  const handleViewReport = (report: ScoutingReport) => {
    setSelectedReport(report);
    setShowReportDialog(true);
  };

  const handleMarkAsReviewed = (reportId: number) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: 'reviewed' } : report
      )
    );
    setShowReportDialog(false);
    toast({
      title: 'Report Reviewed',
      description: 'The scouting report has been marked as reviewed.',
    });
  };

  const handleArchiveReport = (reportId: number) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: 'archived' } : report
      )
    );
    setShowReportDialog(false);
    toast({
      title: 'Report Archived',
      description: 'The scouting report has been archived.',
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: 'Report Downloaded',
      description: 'The scouting report has been downloaded as a PDF.',
    });
  };

  const handleShareReport = () => {
    toast({
      title: 'Report Shared',
      description:
        'The scouting report has been shared with the coaching staff.',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-amber-500">New</Badge>;
      case 'reviewed':
        return <Badge className="bg-blue-500">Reviewed</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'team':
        return <Badge className="bg-purple-500">Team</Badge>;
      case 'player':
        return <Badge className="bg-green-500">Player</Badge>;
      case 'match':
        return <Badge className="bg-blue-500">Match</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-blue-500';
    if (rating >= 4) return 'text-amber-500';
    return 'text-red-500';
  };

  // Filter reports based on search and filters
  const filteredReports = reports.filter((report) => {
    // Search filter
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.subject.toLowerCase().includes(searchTerm.toLowerCase());

    // Type filter
    const matchesType = typeFilter === 'all' || report.type === typeFilter;

    // Team filter
    const matchesTeam =
      teamFilter === 'all' ||
      report.teamName.toLowerCase() === teamFilter.toLowerCase();

    // Status filter
    const matchesStatus =
      statusFilter === 'all' || report.status === statusFilter;

    return matchesSearch && matchesType && matchesTeam && matchesStatus;
  });

  // Get unique team names for filter
  const teamNames = [
    'all',
    ...Array.from(new Set(reports.map((report) => report.teamName))),
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="player">Player</SelectItem>
              <SelectItem value="match">Match</SelectItem>
            </SelectContent>
          </Select>

          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-[150px]">
              <Users className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {teamNames
                .filter((name) => name !== 'all')
                .map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <Card
              key={report.id}
              className={report.status === 'new' ? 'border-amber-500/50' : ''}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{report.title}</CardTitle>
                  <div className="flex gap-2">
                    {getStatusBadge(report.status)}
                    {getTypeBadge(report.type)}
                  </div>
                </div>
                <CardDescription>
                  {report.teamName} •{' '}
                  {new Date(report.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Subject
                      </div>
                      <div className="font-medium">{report.subject}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Author
                      </div>
                      <div className="font-medium">{report.author}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Summary
                    </div>
                    <div className="text-sm line-clamp-2">{report.summary}</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Rating
                      </div>
                      <div
                        className={`text-xl font-bold ${getRatingColor(report.rating)}`}
                      >
                        {report.rating}/10
                      </div>
                    </div>
                    <div>
                      <Button
                        onClick={() => handleViewReport(report)}
                        className="w-full"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8 border rounded-md bg-muted/20">
            <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No Reports Found</h3>
            <p className="text-muted-foreground mb-4">
              No scouting reports match your current filters.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setTeamFilter('all');
                setStatusFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <DialogTitle className="text-2xl">
                    {selectedReport.title}
                  </DialogTitle>
                  <div className="flex gap-2">
                    {getStatusBadge(selectedReport.status)}
                    {getTypeBadge(selectedReport.type)}
                  </div>
                </div>
                <DialogDescription>
                  {selectedReport.teamName} •{' '}
                  {new Date(selectedReport.date).toLocaleDateString()} • By{' '}
                  {selectedReport.author}
                </DialogDescription>
              </DialogHeader>

              <Tabs
                defaultValue="summary"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="recommendations">
                    Recommendations
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-sm">Overview</CardTitle>
                        <div
                          className={`text-xl font-bold ${getRatingColor(selectedReport.rating)}`}
                        >
                          {selectedReport.rating}/10
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{selectedReport.summary}</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Key Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {selectedReport.details.strengths
                            .slice(0, 3)
                            .map((strength, index) => (
                              <li key={index} className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                                {strength}
                              </li>
                            ))}
                          {selectedReport.details.strengths.length > 3 && (
                            <li className="text-sm text-muted-foreground">
                              +{selectedReport.details.strengths.length - 3}{' '}
                              more (see details)
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                          Key Weaknesses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {selectedReport.details.weaknesses
                            .slice(0, 3)
                            .map((weakness, index) => (
                              <li key={index} className="flex items-center">
                                <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                                {weakness}
                              </li>
                            ))}
                          {selectedReport.details.weaknesses.length > 3 && (
                            <li className="text-sm text-muted-foreground">
                              +{selectedReport.details.weaknesses.length - 3}{' '}
                              more (see details)
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Top Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {selectedReport.recommendations
                          .slice(0, 2)
                          .map((recommendation, index) => (
                            <li key={index} className="flex items-center">
                              <Clipboard className="h-4 w-4 text-primary mr-2" />
                              {recommendation}
                            </li>
                          ))}
                        {selectedReport.recommendations.length > 2 && (
                          <li className="text-sm text-muted-foreground">
                            +{selectedReport.recommendations.length - 2} more
                            (see recommendations tab)
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {selectedReport.details.strengths.map(
                            (strength, index) => (
                              <li key={index} className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                                {strength}
                              </li>
                            )
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Weaknesses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {selectedReport.details.weaknesses.map(
                            (weakness, index) => (
                              <li key={index} className="flex items-center">
                                <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                                {weakness}
                              </li>
                            )
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {selectedReport.details.opportunities.map(
                            (opportunity, index) => (
                              <li key={index} className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                {opportunity}
                              </li>
                            )
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Threats</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {selectedReport.details.threats.map(
                            (threat, index) => (
                              <li key={index} className="flex items-center">
                                <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                                {threat}
                              </li>
                            )
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Strategic Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {selectedReport.recommendations.map(
                          (recommendation, index) => (
                            <li key={index} className="flex items-start">
                              <Clipboard className="h-4 w-4 text-primary mr-2 mt-1" />
                              <div>{recommendation}</div>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <div className="flex gap-2">
                  {selectedReport.status === 'new' && (
                    <Button
                      variant="outline"
                      onClick={() => handleMarkAsReviewed(selectedReport.id)}
                    >
                      Mark as Reviewed
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleArchiveReport(selectedReport.id)}
                  >
                    Archive Report
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={handleShareReport}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={() => setShowReportDialog(false)}>
                    Close
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
