// https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-match-all-query.html


GET _search
{
  "query": {
    "match_all": {}
  },
   "size": 100 // ES has a default result of 10 items
}


// === GENERAL STUFF ===
GET _cluster/health
GET _nodes/stats




// === CRUD `quotes` ===
GET quotes/_search
{
  "query": {
    "match_all": {}
  },
  "size": 100 // ES has a default result of 10 items
}













