docker run -d \
  --name leetledger-db \
  -e POSTGRES_DB=leetledger \
  -e POSTGRES_USER=leetledger \
  -e POSTGRES_PASSWORD=devpassword \
  -p 5432:5432 \
  -v leetledger_pgdata:/var/lib/postgresql/data \
  postgres:17