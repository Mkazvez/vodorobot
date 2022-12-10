-- проверили есть ли верменная таблица
if object_id('tempdb..#example') is not null drop table #example;
-- заполнили временную таблицу
with Location_date as (
    select
        location,
        d.date
    from
        (
            select
                distinct [location]
            from
                dbo.example
        ) l
        cross join (
            select
                distinct [date]
            from
                dbo.example
        ) d
)
select
    ld.date,
    ld.location,
    isnull(e.qty, 0) as qty into #example from Location_date ld
    left join dbo.example e on e.location = ld.location
    and e.date = ld.date -- получаем результат
select
    distinct g.date,
    g.location,
    t2.total
from
    #example g
    cross apply (
        select
            coalesce(sum(t2.qty), 0) as total
        from
            #example t2
        where
            g.location = t2.location
            and t2.date <= g.date
    ) t2
order by
    g.location,
    g.date;