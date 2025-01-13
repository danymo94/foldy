#!/usr/bin/env bash

# Crea cartelle di base
mkdir -p node_modules
mkdir -p dist

# File di root
touch .env
touch .gitignore
touch package.json
touch tsconfig.json

# Cartella src e file main
mkdir -p src
touch src/server.ts

# Config
mkdir -p src/config
touch src/config/environment.ts
touch src/config/firebase.ts
touch src/config/index.ts
touch src/config/jwt.ts

# Controllers
mkdir -p src/controllers/admin
touch src/controllers/admin/categories.controller.ts
touch src/controllers/admin/products.controller.ts
touch src/controllers/admin/productAttributes.controller.ts
touch src/controllers/admin/productAttributeAssignments.controller.ts
touch src/controllers/admin/users.controller.ts
touch src/controllers/admin/masterAdmins.controller.ts
touch src/controllers/admin/affiliates.controller.ts
touch src/controllers/admin/customers.controller.ts
touch src/controllers/admin/laundries.controller.ts
touch src/controllers/admin/timeSlots.controller.ts
touch src/controllers/admin/subscriptions.controller.ts
touch src/controllers/admin/coupons.controller.ts
touch src/controllers/admin/orders.controller.ts
touch src/controllers/admin/orderItems.controller.ts
touch src/controllers/admin/payments.controller.ts
touch src/controllers/admin/adminAuth.controller.ts

mkdir -p src/controllers/affiliate
touch src/controllers/affiliate/laundries.controller.ts
touch src/controllers/affiliate/affiliateAuth.controller.ts
touch src/controllers/affiliate/profile.controller.ts

mkdir -p src/controllers/affiliate/laundrySpecific
touch src/controllers/affiliate/laundrySpecific/categories.controller.ts
touch src/controllers/affiliate/laundrySpecific/products.controller.ts
touch src/controllers/affiliate/laundrySpecific/productAttributes.controller.ts
touch src/controllers/affiliate/laundrySpecific/timeSlots.controller.ts
touch src/controllers/affiliate/laundrySpecific/orders.controller.ts

mkdir -p src/controllers/customer
touch src/controllers/customer/orders.controller.ts
touch src/controllers/customer/profile.controller.ts
touch src/controllers/customer/customerAuth.controller.ts

mkdir -p src/controllers/public
touch src/controllers/public/laundries.controller.ts
touch src/controllers/public/categories.controller.ts
touch src/controllers/public/products.controller.ts
touch src/controllers/public/productAttributes.controller.ts
touch src/controllers/public/coupons.controller.ts
touch src/controllers/public/timeSlots.controller.ts
touch src/controllers/public/subscriptions.controller.ts
touch src/controllers/public/public.controller.ts

# Routes
mkdir -p src/routes/admin
touch src/routes/admin/categories.routes.ts
touch src/routes/admin/products.routes.ts
touch src/routes/admin/productAttributes.routes.ts
touch src/routes/admin/productAttributeAssignments.routes.ts
touch src/routes/admin/users.routes.ts
touch src/routes/admin/masterAdmins.routes.ts
touch src/routes/admin/affiliates.routes.ts
touch src/routes/admin/customers.routes.ts
touch src/routes/admin/laundries.routes.ts
touch src/routes/admin/timeSlots.routes.ts
touch src/routes/admin/subscriptions.routes.ts
touch src/routes/admin/coupons.routes.ts
touch src/routes/admin/orders.routes.ts
touch src/routes/admin/orderItems.routes.ts
touch src/routes/admin/payments.routes.ts
touch src/routes/admin/adminAuth.routes.ts

mkdir -p src/routes/affiliate
touch src/routes/affiliate/affiliateAuth.routes.ts
touch src/routes/affiliate/profile.routes.ts
touch src/routes/affiliate/laundries.routes.ts

mkdir -p src/routes/affiliate/laundrySpecific
touch src/routes/affiliate/laundrySpecific/categories.routes.ts
touch src/routes/affiliate/laundrySpecific/products.routes.ts
touch src/routes/affiliate/laundrySpecific/productAttributes.routes.ts
touch src/routes/affiliate/laundrySpecific/timeSlots.routes.ts
touch src/routes/affiliate/laundrySpecific/orders.routes.ts

mkdir -p src/routes/customer
touch src/routes/customer/orders.routes.ts
touch src/routes/customer/profile.routes.ts
touch src/routes/customer/customerAuth.routes.ts

mkdir -p src/routes/public
touch src/routes/public/laundries.routes.ts
touch src/routes/public/categories.routes.ts
touch src/routes/public/products.routes.ts
touch src/routes/public/productAttributes.routes.ts
touch src/routes/public/coupons.routes.ts
touch src/routes/public/timeSlots.routes.ts
touch src/routes/public/subscriptions.routes.ts
touch src/routes/public/public.routes.ts

touch src/routes/index.ts

# Middlewares
mkdir -p src/middlewares
touch src/middlewares/adminAuth.middleware.ts
touch src/middlewares/affiliateAuth.middleware.ts
touch src/middlewares/customerAuth.middleware.ts
touch src/middlewares/errorHandler.middleware.ts

# Models
mkdir -p src/models
touch src/models/Category.model.ts
touch src/models/Product.model.ts
touch src/models/ProductAttribute.model.ts
touch src/models/ProductAttributeAssignment.model.ts
touch src/models/User.model.ts
touch src/models/MasterAdmin.model.ts
touch src/models/Affiliate.model.ts
touch src/models/Customer.model.ts
touch src/models/Laundry.model.ts
touch src/models/TimeSlot.model.ts
touch src/models/Subscription.model.ts
touch src/models/Coupon.model.ts
touch src/models/Order.model.ts
touch src/models/OrderItem.model.ts
touch src/models/Payment.model.ts

# Services
mkdir -p src/services
touch src/services/auth.service.ts
touch src/services/firestore.service.ts
touch src/services/utils.service.ts

echo "Struttura di file e cartelle creata con successo!"
