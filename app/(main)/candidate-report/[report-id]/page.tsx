"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useInterviewStore } from "@/lib/store"
import {
  ArrowLeft,
  Download,
  CheckCircle,
  AlertTriangle,
  User,
  Brain,
  MessageSquare,
  Lightbulb,
  Users,
  Clock,
  Target,
  Zap,
  Award,
} from "lucide-react"

export default function ReportPage() {
  const params = useParams()
  const router = useRouter()
  const { candidate, interviewData } = useInterviewStore()

  // Enhanced metrics with detailed scoring
  const reportData = {
    candidate: {
      name: candidate?.name || "John Doe",
      email: candidate?.email || "john@example.com",
      position: candidate?.position || "Software Engineer",
    },
    overall: {
      score: 82,
      recommendation: "HIRE",
      confidence: 89,
    },
    metrics: {
      problemSolving: {
        score: 85,
        description: "Analytical thinking and solution approach",
        icon: Brain,
        color: "blue",
      },
      communication: {
        score: 88,
        description: "Clarity, articulation, and listening skills",
        icon: MessageSquare,
        color: "green",
      },
      technicalSkills: {
        score: 79,
        description: "Domain knowledge and technical expertise",
        icon: Zap,
        color: "purple",
      },
      creativity: {
        score: 76,
        description: "Innovation and creative thinking",
        icon: Lightbulb,
        color: "yellow",
      },
      teamwork: {
        score: 90,
        description: "Collaboration and interpersonal skills",
        icon: Users,
        color: "teal",
      },
      adaptability: {
        score: 83,
        description: "Flexibility and learning agility",
        icon: Target,
        color: "orange",
      },
      timeManagement: {
        score: 81,
        description: "Organization and priority management",
        icon: Clock,
        color: "indigo",
      },
      leadership: {
        score: 74,
        description: "Initiative and influence potential",
        icon: Award,
        color: "red",
      },
    },
    strengths: [
      "Excellent communication and articulation",
      "Strong collaborative mindset",
      "Good analytical problem-solving approach",
      "Clear understanding of role requirements",
    ],
    improvements: [
      "Could expand on technical implementation details",
      "Consider developing leadership experience",
      "Enhance creative problem-solving examples",
    ],
    summary:
      "Strong candidate with excellent communication skills and solid technical foundation. Shows great potential for team collaboration and growth.",
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-green-500"
    if (score >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getMetricColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-100",
      green: "text-green-600 bg-green-100",
      purple: "text-purple-600 bg-purple-100",
      yellow: "text-yellow-600 bg-yellow-100",
      teal: "text-teal-600 bg-teal-100",
      orange: "text-orange-600 bg-orange-100",
      indigo: "text-indigo-600 bg-indigo-100",
      red: "text-red-600 bg-red-100",
    }
    return colors[color as keyof typeof colors] || "text-gray-600 bg-gray-100"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interview Report</h1>
              <p className="text-gray-600">
                {reportData.candidate.name} • {reportData.candidate.position}
              </p>
            </div>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Overall Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className={`text-5xl font-bold mb-2 ${getScoreColor(reportData.overall.score)}`}>
                      {reportData.overall.score}
                    </div>
                    <div className="text-gray-600">Overall Score</div>
                  </div>
                  <div>
                    <Badge
                      className={`text-lg px-4 py-2 mb-2 ${
                        reportData.overall.recommendation === "HIRE"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {reportData.overall.recommendation}
                    </Badge>
                    <div className="text-gray-600">Recommendation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{reportData.overall.confidence}%</div>
                    <div className="text-gray-600">Confidence</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(reportData.metrics).map(([key, metric]) => {
                    const IconComponent = metric.icon
                    return (
                      <div key={key} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${getMetricColorClasses(metric.color)}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                              <p className="text-sm text-gray-600">{metric.description}</p>
                            </div>
                          </div>
                          <div className={`text-xl font-bold ${getScoreColor(metric.score)}`}>{metric.score}</div>
                        </div>
                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full transition-all duration-500 ease-out rounded-full ${getProgressColor(
                              metric.score,
                            )}`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{reportData.summary}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Candidate Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Candidate Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900">{reportData.candidate.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{reportData.candidate.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Position</label>
                  <p className="text-gray-900">{reportData.candidate.position}</p>
                </div>
              </CardContent>
            </Card>

            {/* Key Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reportData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Growth Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reportData.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className={`w-full ${
                    reportData.overall.recommendation === "HIRE"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  }`}
                >
                  {reportData.overall.recommendation === "HIRE" ? "Move to Next Round" : "Schedule Follow-up"}
                </Button>
                <Button variant="outline" className="w-full">
                  Send Feedback
                </Button>
                <Button variant="outline" className="w-full">
                  Add Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
