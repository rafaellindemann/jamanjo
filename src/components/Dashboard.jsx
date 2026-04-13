import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { supabase } from '../services/supabase';
import { GlobalContext } from '../contexts/GlobalContext';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const SITE = 'jamanjo';

const RANGE_OPTIONS = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 90 dias' },
  { value: 'all', label: 'Todo o período' },
];

const TYPE_LABELS = {
  page: 'Páginas',
  category: 'Categorias',
  tag: 'Bolachas',
  resource_link: 'Recursos',
};

const TYPE_COLORS = {
  page: '#6B8E23',
  category: '#8B4513',
  tag: '#4caf50',
  resource_link: '#1565c0',
};

function Dashboard() {
  const { resources } = useContext(GlobalContext);

  const [range, setRange] = useState('30');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [visibleSeries, setVisibleSeries] = useState({
    page: true,
    category: true,
    tag: true,
    resource_link: true,
  });

  const resourceNameMap = useMemo(() => {
    const map = new Map();
    resources.forEach((resource) => {
      map.set(String(resource.id), resource.nome);
    });
    return map;
  }, [resources]);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError('');

      let query = supabase
        .from('site_pageviews_diarios')
        .select('id, site, data, tipo, pagina, pageviews, updated_at')
        .eq('site', SITE)
        .order('data', { ascending: false })
        .order('pageviews', { ascending: false });

      if (range !== 'all') {
        const days = Number(range);
        const start = new Date();
        start.setDate(start.getDate() - (days - 1));
        const startIso = start.toISOString().slice(0, 10);
        query = query.gte('data', startIso);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message || 'Erro ao carregar estatísticas.');
        setRows([]);
      } else {
        setRows(data ?? []);
      }

      setLoading(false);
    };

    loadStats();
  }, [range]);

  const metrics = useMemo(() => {
    const sumViews = (items) => items.reduce((acc, item) => acc + item.pageviews, 0);

    const byType = rows.reduce((acc, row) => {
      if (!acc[row.tipo]) acc[row.tipo] = [];
      acc[row.tipo].push(row);
      return acc;
    }, {});

    const totalViews = sumViews(rows);
    const totalDays = new Set(rows.map((row) => row.data)).size;
    const totalItems = rows.length;

    const groupedByPath = (type) => {
      const map = new Map();

      rows
        .filter((row) => row.tipo == type)
        .forEach((row) => {
          const key = row.pagina;
          const current = map.get(key) || {
            pagina: key,
            pageviews: 0,
            dias: 0,
            ultima_data: row.data,
          };

          current.pageviews += row.pageviews;
          current.dias += 1;

          if (row.data > current.ultima_data) current.ultima_data = row.data;

          map.set(key, current);
        });

      return Array.from(map.values()).sort((a, b) => b.pageviews - a.pageviews);
    };

    const daysMap = new Map();

    rows.forEach((row) => {
      const current = daysMap.get(row.data) || {
        data: row.data,
        page: 0,
        category: 0,
        tag: 0,
        resource_link: 0,
        total: 0,
      };

      current[row.tipo] = (current[row.tipo] || 0) + row.pageviews;
      current.total += row.pageviews;

      daysMap.set(row.data, current);
    });

    const lineChartData = Array.from(daysMap.values()).sort((a, b) =>
      a.data.localeCompare(b.data)
    );

    const formatCategory = (path) =>
      path.replace('/categoria/', '').replaceAll('-', ' ');

    const formatTag = (path) =>
      path.replace('/tag/', '').replaceAll('-', ' ');

    const formatResource = (path) => {
      const id = path.replace('/recurso/', '');
      return resourceNameMap.get(id) || `Recurso #${id}`;
    };

    const topCategories = groupedByPath('category').slice(0, 8).map((item) => ({
      ...item,
      label: formatCategory(item.pagina),
    }));

    const topTags = groupedByPath('tag').slice(0, 10).map((item) => ({
      ...item,
      label: formatTag(item.pagina),
    }));

    const topResources = groupedByPath('resource_link').slice(0, 10).map((item) => ({
      ...item,
      label: formatResource(item.pagina),
    }));

    const typeChartData = Object.keys(TYPE_LABELS).map((type) => ({
      name: TYPE_LABELS[type],
      value: sumViews(byType[type] ?? []),
      color: TYPE_COLORS[type],
      type,
    }));

    return {
      totalViews,
      totalDays,
      totalItems,
      homeViews: sumViews(byType.page ?? []),
      categoryViews: sumViews(byType.category ?? []),
      tagViews: sumViews(byType.tag ?? []),
      resourceViews: sumViews(byType.resource_link ?? []),
      topCategories,
      topTags,
      topResources,
      lineChartData,
      typeChartData,
      byTypeCards: Object.keys(TYPE_LABELS).map((type) => ({
        type,
        label: TYPE_LABELS[type],
        total: sumViews(byType[type] ?? []),
        rows: (byType[type] ?? []).length,
      })),
    };
  }, [rows, resourceNameMap]);

  const toggleSeries = (series) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [series]: !prev[series],
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #eff7df 0%, #f7f3ea 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
            <CardContent>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={2}
              >
                <Box>
                  <Typography variant="overline" color="secondary.main">
                    Painel secreto do mato
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Dashboard de stats do Jamanjo
                  </Typography>
                  <Typography color="text.secondary">
                    Visão geral de home, categorias, bolachas e cliques nos recursos.
                  </Typography>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel id="range-label">Período</InputLabel>
                    <Select
                      labelId="range-label"
                      value={range}
                      label="Período"
                      onChange={(e) => setRange(e.target.value)}
                    >
                      {RANGE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button variant="contained" color="secondary" href="/">
                    Voltar para o site
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {loading ? (
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CircularProgress size={24} />
                  <Typography>Carregando estatísticas...</Typography>
                </Stack>
              </CardContent>
            </Card>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                }}
              >
                <StatCard title="Visualizações totais" value={metrics.totalViews} subtitle="Soma de todos os logs no período" />
                <StatCard title="Dias com atividade" value={metrics.totalDays} subtitle="Dias distintos com algum acesso" />
                <StatCard title="Linhas agregadas" value={metrics.totalItems} subtitle="Registros únicos por dia/tipo/página" />
                <StatCard title="Cliques em recursos" value={metrics.resourceViews} subtitle="Quantidade total de acessos aos materiais" />
              </Box>

              <Card sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    Distribuição por tipo
                  </Typography>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
                      gap: 2,
                    }}
                  >
                    {metrics.byTypeCards.map((item) => (
                      <Card
                        key={item.type}
                        variant="outlined"
                        sx={{
                          borderRadius: 3,
                          borderColor: TYPE_COLORS[item.type],
                          backgroundColor: `${TYPE_COLORS[item.type]}11`,
                        }}
                      >
                        <CardContent>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                            <Typography fontWeight={700}>{item.label}</Typography>
                            <Chip
                              size="small"
                              label={item.type}
                              sx={{
                                backgroundColor: TYPE_COLORS[item.type],
                                color: 'white',
                              }}
                            />
                          </Stack>
                          <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {item.total}
                          </Typography>
                          <Typography color="text.secondary">
                            {item.rows} linhas agregadas
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', xl: '1.2fr 0.8fr' },
                  gap: 2,
                }}
              >
                <ChartCard title="Acessos x dias por tipo">
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={1}
                    sx={{ mb: 2, flexWrap: 'wrap' }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={visibleSeries.page}
                          onChange={() => toggleSeries('page')}
                        />
                      }
                      label="Home"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={visibleSeries.category}
                          onChange={() => toggleSeries('category')}
                        />
                      }
                      label="Categorias"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={visibleSeries.tag}
                          onChange={() => toggleSeries('tag')}
                        />
                      }
                      label="Bolachas"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={visibleSeries.resource_link}
                          onChange={() => toggleSeries('resource_link')}
                        />
                      }
                      label="Recursos"
                    />
                  </Stack>

                  <Box sx={{ width: '100%', height: 340 }}>
                    <ResponsiveContainer>
                      <LineChart data={metrics.lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {visibleSeries.page && (
                          <Line
                            type="monotone"
                            dataKey="page"
                            name="Home"
                            stroke={TYPE_COLORS.page}
                            strokeWidth={3}
                          />
                        )}
                        {visibleSeries.category && (
                          <Line
                            type="monotone"
                            dataKey="category"
                            name="Categorias"
                            stroke={TYPE_COLORS.category}
                            strokeWidth={3}
                          />
                        )}
                        {visibleSeries.tag && (
                          <Line
                            type="monotone"
                            dataKey="tag"
                            name="Bolachas"
                            stroke={TYPE_COLORS.tag}
                            strokeWidth={3}
                          />
                        )}
                        {visibleSeries.resource_link && (
                          <Line
                            type="monotone"
                            dataKey="resource_link"
                            name="Recursos"
                            stroke={TYPE_COLORS.resource_link}
                            strokeWidth={3}
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </ChartCard>

                <ChartCard title="Participação por tipo">
                  <Box sx={{ width: '100%', height: 340 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={metrics.typeChartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={65}
                          outerRadius={100}
                          paddingAngle={3}
                        >
                          {metrics.typeChartData.map((entry) => (
                            <Cell key={entry.type} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </ChartCard>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <ChartCard title="Top categorias">
                  <Box sx={{ width: '100%', height: 360 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={metrics.topCategories}
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis
                          type="category"
                          dataKey="label"
                          width={120}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip />
                        <Bar dataKey="pageviews" name="Views" fill="#8B4513" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </ChartCard>

                <ChartCard title="Recursos mais clicados">
                  <Box sx={{ width: '100%', height: 360 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={metrics.topResources}
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis
                          type="category"
                          dataKey="label"
                          width={180}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip />
                        <Bar dataKey="pageviews" name="Cliques" fill="#1565c0" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </ChartCard>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <RankingCard
                  title="Top bolachas"
                  items={metrics.topTags}
                  emptyLabel="Nenhuma bolacha clicada ainda."
                />
                <Card sx={{ borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                      Resumo rápido
                    </Typography>

                    <Stack spacing={1.2}>
                      <SummaryRow label="Home" value={metrics.homeViews} color={TYPE_COLORS.page} />
                      <SummaryRow label="Categorias" value={metrics.categoryViews} color={TYPE_COLORS.category} />
                      <SummaryRow label="Bolachas" value={metrics.tagViews} color={TYPE_COLORS.tag} />
                      <SummaryRow label="Recursos" value={metrics.resourceViews} color={TYPE_COLORS.resource_link} />
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Typography color="text.secondary">
                      O painel usa os dados agregados em <strong>site_pageviews_diarios</strong>,
                      então cada linha representa uma combinação única de site, data, tipo e página.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
      <CardContent>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
        <Typography color="text.secondary">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
}

function SummaryRow({ label, value, color }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={1.2} alignItems="center">
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />
        <Typography>{label}</Typography>
      </Stack>
      <Typography fontWeight={700}>{value}</Typography>
    </Stack>
  );
}

function RankingCard({ title, items, emptyLabel }) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          {title}
        </Typography>

        <Stack spacing={1.5}>
          {items.length === 0 ? (
            <Typography color="text.secondary">{emptyLabel}</Typography>
          ) : (
            items.map((item, index) => (
              <Box key={item.pagina}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 0.5 }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <Chip size="small" label={`#${index + 1}`} />
                    <Typography sx={{ textTransform: 'capitalize' }}>
                      {item.label}
                    </Typography>
                  </Stack>
                  <Typography fontWeight={700}>{item.pageviews}</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Registrado em {item.dias} dias • última vez em {item.ultima_data}
                </Typography>
              </Box>
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, children }) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export default Dashboard;