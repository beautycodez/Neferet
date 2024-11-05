CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    categoriaId VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    talla INT,
    cantidad INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    foto TEXT NOT NULL
);