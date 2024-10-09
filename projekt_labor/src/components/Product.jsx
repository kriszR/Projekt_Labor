export default function Product ({ product }) {
    return (
        <article className="bg-white p-10 text-center">
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>{}</p>
        </article>
    )
}