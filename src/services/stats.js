import { supabase } from './supabase';

const SITE = 'jamanjo';

const getToday = () => new Date().toISOString().slice(0, 10);

// remove acentos, espaços, caracteres especiais etc
const slugify = (text = '') =>
  text
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const logStat = async ({ tipo, pagina }) => {
  const { error } = await supabase.rpc('incrementar_pageview', {
    p_site: SITE,
    p_data: getToday(),
    p_tipo: tipo,
    p_pagina: pagina
  });

  if (error) {
    console.error('Erro ao logar estatística:', { tipo, pagina, error });
  }
};

// HOME
export const logHomeView = async () => {
  await logStat({
    tipo: 'page',
    pagina: '/'
  });
};

// CATEGORIA (navbar)
export const logCategoryView = async (categoria) => {
  await logStat({
    tipo: 'category',
    pagina: `/categoria/${slugify(categoria)}`
  });
};

// TAG / BOLACHA
export const logTagView = async (tag) => {
  await logStat({
    tipo: 'tag',
    pagina: `/tag/${slugify(tag)}`
  });
};

// CLIQUE NO RECURSO
export const logResourceClick = async (resource) => {
  await logStat({
    tipo: 'resource_link',
    pagina: `/recurso/${resource.id}`
  });
};