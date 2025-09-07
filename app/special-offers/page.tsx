import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import {connectDB} from "@/lib/mongodb"
import Product from "@/models/Product"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ArrowLeft, Tag} from "lucide-react"
import {getCheckedLocale} from "@/lib/server-utils";
import Category from "@/models/Category";

export default async function SpecialOffer() {
  // Connect to DB & fetch products with special = true
  await connectDB()
  await Category.find()
  const offerProducts = await Product.find({special: true})
    .populate("category")
    .sort({_id: -1})
    .limit(12)
    .lean()

  const {t} = await getCheckedLocale()

  return (
    <div className="min-h-screen bg-muted/30 py-6 px-3 sm:py-10 sm:px-4">
      {/* TechShop Special Deals Banner */}
      <div className="container mx-auto mb-8 sm:mb-10">
        <Card className="bg-primary/90 text-foreground shadow-lg backdrop-blur-md">
          <CardHeader className="text-center px-4 sm:px-8">
            <CardTitle className="flex flex-wrap items-center justify-center gap-2 text-2xl sm:text-3xl font-extrabold">
              <Tag className="h-6 w-6 sm:h-7 sm:w-7"/>
              {t("specialDeals")}
              <Tag className="h-6 w-6 sm:h-7 sm:w-7"/>
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-foreground/90 mt-2">
              {t("specialTagline")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Badge
              variant="secondary"
              className="text-sm sm:text-lg px-4 sm:px-6 py-1.5 sm:py-2 font-semibold tracking-wide"
            >
              {t("limitedTime")}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {offerProducts.length > 0 ? (
          offerProducts.map((product: any) => (
            <ProductCard
              key={product._id.toString()}
              product={JSON.parse(JSON.stringify(product))}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground text-base sm:text-lg">
            {t("noDeals")}
          </p>
        )}
      </div>

      {/* Back to Home */}
      <div className="mt-8 sm:mt-10 text-center">
        <Button asChild className="px-4 sm:px-6 py-2 text-sm sm:text-base">
          <Link href="/" className="flex items-center justify-center">
            <ArrowLeft/>
            {t("backHome")}
          </Link>
        </Button>
      </div>
    </div>
  )
}
