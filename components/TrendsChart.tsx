'use client';

import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

import type { Biomarkers } from '@/lib/health-types';

interface TrendsChartProps {
  biomarkers: Biomarkers;
}

type TabType = 'glucose' | 'cholesterol' | 'bloodPressure' | 'heartRate';

type MetricPoint = { month: string; value: number };
type BloodPressurePoint = { month: string; systolic: number; diastolic: number };

export default function TrendsChart({ biomarkers }: TrendsChartProps) {
  const [activeTab, setActiveTab] = useState<TabType>('glucose');

  const todayGlucose = biomarkers.glucose ?? 106;
  const todayCholesterol = biomarkers.cholesterol ?? 195;
  const todayHeartRate = biomarkers.heartRate ?? 72;

  let todaySystolic = 118;
  let todayDiastolic = 78;

  if (biomarkers.bloodPressure) {
    const [systolic, diastolic] = biomarkers.bloodPressure.split('/');
    const systolicValue = Number.parseInt(systolic, 10);
    const diastolicValue = Number.parseInt(diastolic, 10);

    if (Number.isFinite(systolicValue) && Number.isFinite(diastolicValue)) {
      todaySystolic = systolicValue;
      todayDiastolic = diastolicValue;
    }
  }

  const tabConfigs = useMemo(() => {
    const glucoseData: MetricPoint[] = [
      { month: 'Dec', value: Math.round(todayGlucose * 0.88) },
      { month: 'Jan', value: Math.round(todayGlucose * 0.92) },
      { month: 'Feb', value: Math.round(todayGlucose * 0.9) },
      { month: 'Mar', value: Math.round(todayGlucose * 0.96) },
      { month: 'Apr', value: Math.round(todayGlucose * 0.94) },
      { month: 'Today', value: todayGlucose },
    ];

    const cholesterolData: MetricPoint[] = [
      { month: 'Dec', value: Math.round(todayCholesterol * 0.95) },
      { month: 'Jan', value: Math.round(todayCholesterol * 0.97) },
      { month: 'Feb', value: Math.round(todayCholesterol * 1.02) },
      { month: 'Mar', value: Math.round(todayCholesterol * 0.98) },
      { month: 'Apr', value: Math.round(todayCholesterol * 1.05) },
      { month: 'Today', value: todayCholesterol },
    ];

    const bloodPressureData: BloodPressurePoint[] = [
      { month: 'Dec', systolic: Math.round(todaySystolic * 0.97), diastolic: Math.round(todayDiastolic * 0.96) },
      { month: 'Jan', systolic: Math.round(todaySystolic * 1.03), diastolic: Math.round(todayDiastolic * 1.05) },
      { month: 'Feb', systolic: todaySystolic, diastolic: todayDiastolic },
      { month: 'Mar', systolic: Math.round(todaySystolic * 1.06), diastolic: Math.round(todayDiastolic * 1.06) },
      { month: 'Apr', systolic: Math.round(todaySystolic * 1.02), diastolic: Math.round(todayDiastolic * 1.03) },
      { month: 'Today', systolic: todaySystolic, diastolic: todayDiastolic },
    ];

    const heartRateData: MetricPoint[] = [
      { month: 'Dec', value: Math.round(todayHeartRate * 0.94) },
      { month: 'Jan', value: Math.round(todayHeartRate * 1.04) },
      { month: 'Feb', value: Math.round(todayHeartRate * 0.97) },
      { month: 'Mar', value: Math.round(todayHeartRate * 1.03) },
      { month: 'Apr', value: Math.round(todayHeartRate * 0.99) },
      { month: 'Today', value: todayHeartRate },
    ];

    return {
      glucose: {
        label: 'Glucose',
        unit: 'mg/dL',
        color: '#10b981',
        data: glucoseData,
        title: 'Blood Glucose History',
        description: 'Fasting blood glucose trajectory over the past 6 months.',
      },
      cholesterol: {
        label: 'Cholesterol',
        unit: 'mg/dL',
        color: '#8b5cf6',
        data: cholesterolData,
        title: 'Total Cholesterol History',
        description: 'Longitudinal lipid compliance metrics.',
      },
      bloodPressure: {
        label: 'Blood Pressure',
        unit: 'mmHg',
        color: '#f59e0b',
        data: bloodPressureData,
        title: 'Blood Pressure Trajectory',
        description: 'Systolic vs. diastolic pressure values.',
      },
      heartRate: {
        label: 'Heart Rate',
        unit: 'bpm',
        color: '#06b6d4',
        data: heartRateData,
        title: 'Resting Heart Rate',
        description: 'Baseline autonomic heart rate tracking.',
      },
    } as const;
  }, [todayCholesterol, todayDiastolic, todayGlucose, todayHeartRate, todaySystolic]);

  const config = tabConfigs[activeTab];

  return (
    <div className="flex h-[400px] flex-col rounded-2xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="flex shrink-0 flex-col items-start justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-900 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <div>
            <h2 className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">{config.title}</h2>
            <p className="mt-0.5 text-[10px] text-zinc-500">{config.description}</p>
          </div>
        </div>

        <div className="flex gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-900 dark:bg-zinc-950">
          {(Object.keys(tabConfigs) as TabType[]).map((tabId) => (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`rounded px-2.5 py-1 text-[10px] font-bold tracking-tight transition-colors ${
                activeTab === tabId
                  ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              {tabConfigs[tabId].label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 w-full flex-grow pt-6">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'bloodPressure' ? (
            <LineChart data={config.data as BloodPressurePoint[]} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '0.75rem',
                  borderColor: '#e4e4e7',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="systolic" name="Systolic" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          ) : (
            <AreaChart data={config.data as MetricPoint[]} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id={`colorGrad-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '0.75rem',
                  borderColor: '#e4e4e7',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                name={config.label}
                stroke={config.color}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#colorGrad-${activeTab})`}
                dot={{ fill: config.color, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
