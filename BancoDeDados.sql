-- Table: TelaCadastro_usuario
CREATE TABLE TelaCadastro_usuario (
    cpf char(11)  NOT NULL,
    nome varchar(100)  NOT NULL,
    email varchar(50)  NOT NULL,
    telefone char(15)  NOT NULL,
    dt_nascimento date  NOT NULL,
    senha varchar(15)  NOT NULL,
    CONSTRAINT TelaCadastro_usuario_pk PRIMARY KEY (cpf)
);

-- Table: cadastroItem
CREATE TABLE cadastroItem (
    cd_item int AUTO_INCREMENT NOT NULL,
    produto varchar(50)  NOT NULL,
    data_compra date  NOT NULL,
    valor decimal(6,4)  NOT NULL,
    quantidade int,
    descricao varchar(300),
    sg_setor char(2)  NOT NULL,
    TelaCadastro_usuario_cpf char(11)  NOT NULL,
    CONSTRAINT cadastroItem_pk PRIMARY KEY (cd_item)
);

-- foreign keys
-- Reference: cadastroItem_TelaCadastro_usuario (table: cadastroItem)
ALTER TABLE cadastroItem ADD CONSTRAINT cadastroItem_TelaCadastro_usuario FOREIGN KEY cadastroItem_TelaCadastro_usuario (TelaCadastro_usuario_cpf)
    REFERENCES TelaCadastro_usuario (cpf);
