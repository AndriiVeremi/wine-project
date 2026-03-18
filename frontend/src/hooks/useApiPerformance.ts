import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

const metrics: PerformanceMetric[] = [];

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useApiPerformance = () => {
  const location = useLocation();

  const trackRequest = async (url: string, init?: RequestInit) => {
    const start = performance.now();
    try {
      const response = await fetch(`${API}${url}`, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
      });
      const duration = performance.now() - start;

      metrics.push({
        name: url,
        duration,
        timestamp: Date.now(),
      });

      console.log(`📊 API: ${url} - ${duration.toFixed(2)}ms`);

      return response;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`❌ API Error: ${url} - ${duration.toFixed(2)}ms`);
      throw error;
    }
  };

  const getMetrics = () => metrics;

  const printReport = () => {
    console.log('\n═══════════════════════════════════════════');
    console.log('        FRONTEND API PERFORMANCE REPORT');
    console.log('═══════════════════════════════════════════\n');

    const grouped = metrics.reduce(
      (acc, m) => {
        acc[m.name] = acc[m.name] || [];
        acc[m.name].push(m.duration);
        return acc;
      },
      {} as Record<string, number[]>,
    );

    for (const [name, times] of Object.entries(grouped)) {
      const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
      const min = Math.min(...times).toFixed(2);
      const max = Math.max(...times).toFixed(2);

      console.log(
        `${name.padEnd(40)} avg: ${avg.padStart(7)}ms | min: ${min.padStart(6)}ms | max: ${max.padStart(6)}ms`,
      );
    }

    console.log('\n───────────────────────────────────────────');
    console.log(`  Total requests: ${metrics.length}`);
    console.log('═══════════════════════════════════════════\n');
  };

  useEffect(() => {
    const report = localStorage.getItem('showPerfReport');
    if (report === 'true') {
      console.log(`📍 Page: ${location.pathname}`);
      console.log(`⏱️  Load time: ${performance.now().toFixed(2)}ms from navigation start\n`);
    }
  }, [location.pathname]);

  return { trackRequest, getMetrics, printReport };
};

if (typeof window !== 'undefined') {
  (window as Window & { printPerfReport?: () => void }).printPerfReport = () => {
    const apiFetch = window.fetch;
    const metrics: PerformanceMetric[] = [];

    window.fetch = async (...args) => {
      const start = performance.now();
      const response = await apiFetch(...args);
      const duration = performance.now() - start;
      const url = args[0] as string;

      if (url.includes('/api/')) {
        metrics.push({
          name: url.replace(API, ''),
          duration,
          timestamp: Date.now(),
        });

        console.log(`📊 ${url.replace(API, '')}: ${duration.toFixed(2)}ms`);
      }

      return response;
    };

    setTimeout(() => {
      console.log('\n═══════════════════════════════════════════');
      console.log('     FRONTEND PERFORMANCE SUMMARY');
      console.log('═══════════════════════════════════════════\n');

      if (metrics.length === 0) {
        console.log('No API requests captured. Make sure backend is running.\n');
        return;
      }

      const grouped = metrics.reduce(
        (acc, m) => {
          acc[m.name] = acc[m.name] || [];
          acc[m.name].push(m.duration);
          return acc;
        },
        {} as Record<string, number[]>,
      );

      for (const [name, times] of Object.entries(grouped)) {
        const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
        const min = Math.min(...times).toFixed(2);
        const max = Math.max(...times).toFixed(2);
        const count = times.length;

        console.log(`${name}`);
        console.log(`  avg: ${avg}ms | min: ${min}ms | max: ${max}ms | requests: ${count}\n`);
      }

      console.log('───────────────────────────────────────────');
      console.log(`Total API requests: ${metrics.length}\n`);
      console.log('Tip: Run in browser console anytime with: window.printPerfReport()\n');
    }, 2000);
  };
}

export const logRenderTime = (componentName: string) => {
  const start = performance.now();
  return () => {
    const duration = performance.now() - start;
    if (duration > 16) {
      console.log(`⚠️  ${componentName} rendered in ${duration.toFixed(2)}ms (target: <16ms)`);
    }
  };
};
