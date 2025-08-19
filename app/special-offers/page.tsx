import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import {connectDB} from "@/lib/mongodb"
import Product from "@/models/Product"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ArrowLeft, Gift} from "lucide-react"

export default async function SpecialOffer() {
  // Connect to DB & fetch top 4 products
  await connectDB()
  const offerProducts = await Product.find()
    .sort({createdAt: -1, _id: -1})
    .limit(4)
    .lean()

  return (
    <div className="min-h-screen bg-muted/30 py-10">
      {/* Independence Day Offer Banner */}
      <div className="container mx-auto mb-10">
        <Card className="bg-primary text-primary-foreground shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl font-extrabold">
              <Gift className="h-7 w-7"/>
              Independence Day Special Offer
            </CardTitle>
            <CardDescription className="text-lg text-primary-foreground/90 mt-2">
              Get <span className="font-semibold">20% OFF</span> on all products — Today Only!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Badge variant="secondary" className="text-xl px-6 py-2 font-bold">
              Use Code: <span className="ml-2 text-primary">PAK20</span>
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {offerProducts.map((product: any) => (
          <ProductCard
            key={product._id.toString()}
            product={JSON.parse(JSON.stringify(product))}
          />
        ))}
      </div>

      {/* Back to Home */}
      <div className="mt-10 text-center">
        <Button asChild variant="secondary" size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4"/>
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
