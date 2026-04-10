alter table public.site_pageviews_diarios
add column if not exists tipo text;

update public.site_pageviews_diarios
set tipo = 'page'
where tipo is null;

alter table public.site_pageviews_diarios
alter column tipo set not null;

alter table public.site_pageviews_diarios
drop constraint if exists unique_site_data_pagina;

alter table public.site_pageviews_diarios
add constraint unique_site_data_tipo_pagina unique (site, data, tipo, pagina);

create index if not exists idx_pageviews_site_data_tipo
on public.site_pageviews_diarios (site, data, tipo);

create or replace function public.incrementar_pageview(
    p_site text,
    p_data date,
    p_tipo text,
    p_pagina text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.site_pageviews_diarios (site, data, tipo, pagina, pageviews)
    values (p_site, p_data, p_tipo, p_pagina, 1)
    on conflict (site, data, tipo, pagina)
    do update
    set
        pageviews = site_pageviews_diarios.pageviews + 1,
        updated_at = now();
end;
$$;

revoke execute on function public.incrementar_pageview(text, date, text, text) from public;
revoke execute on function public.incrementar_pageview(text, date, text, text) from authenticated;

grant usage on schema public to anon;
grant usage on schema public to authenticated;

grant execute on function public.incrementar_pageview(text, date, text, text) to anon;
grant execute on function public.incrementar_pageview(text, date, text, text) to authenticated;

select *
from public.site_pageviews_diarios
order by data desc, tipo, pagina;
