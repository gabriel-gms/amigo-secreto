-- CreateTable
CREATE TABLE "Eventos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "agrupado" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" SERIAL NOT NULL,
    "name_grupo" TEXT NOT NULL,
    "id_evento" INTEGER NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "amigo_secreto" TEXT NOT NULL DEFAULT '',
    "id_grupo" INTEGER NOT NULL,
    "id_evento" INTEGER NOT NULL,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "Eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoas" ADD CONSTRAINT "Pessoas_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "Eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoas" ADD CONSTRAINT "Pessoas_id_grupo_fkey" FOREIGN KEY ("id_grupo") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
