import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import {connectDB} from "@/lib/mongodb"
import Product from "@/models/Product"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ArrowLeft, Tag} from "lucide-react"

export default async function SpecialOffer() {
  // Connect to DB & fetch products with special = true
  await connectDB()
  const offerProducts = await Product.find({special: true})
    .populate("category")
    .sort({createdAt: -1, _id: -1})
    .limit(12)
    .lean()

  return (
    <div className="min-h-screen bg-muted/30 py-10 px-4">
      {/* TechShop Special Deals Banner */}
      <div className="container mx-auto mb-10">
        <Card className="bg-primary/90 text-foreground shadow-lg backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl font-extrabold">
              <Tag className="h-7 w-7"/> TechShop Deals <Tag className="h-7 w-7"/>
            </CardTitle>
            <CardDescription className="text-lg text-foreground/90 mt-2">
              Exclusive discounts on the latest tech products. Upgrade your setup today!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Badge
              variant="secondary"
              className="text-lg px-6 py-2 font-semibold tracking-wide"
            >
              Limited Time • Don’t Miss Out!
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {offerProducts.length > 0 ? (
          offerProducts.map((product: any) => (
            <ProductCard
              key={product._id.toString()}
              product={JSON.parse(JSON.stringify(product))}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground text-lg">
            No special deals available right now. Please check back soon!
          </p>
        )}
      </div>

      {/* Back to Home */}
      <div className="mt-10 text-center">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4"/>
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
