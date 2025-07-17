// import React from "react";
// import { cn } from "@/lib/utils";

// interface MainProps extends React.HTMLAttributes<HTMLElement> {
//   fixed?: boolean;
// }

// export const Main = React.forwardRef<HTMLElement, MainProps>(
//   ({ fixed, children, ...props }, ref) => {
//     return (
//       <main
//         ref={ref}
//         className={cn(
//           "peer-[.header-fixed]/header:mt-16",
//           "px-4 py-6",
//           "flex justify-center",
//           fixed && "fixed-main flex grow flex-col overflow-hidden container"
//         )}
//         {...props}
//       >
//         <div className="container">{children}</div>
//       </main>
//     );
//   }
// );

// Main.displayName = "Main";
import React from 'react'
import { cn } from '@/lib/utils'

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export const Main = ({ fixed, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-16',
        
        fixed && 'fixed-main flex grow flex-col overflow-hidden'
      )}
      {...props}
    />
  )
}

Main.displayName = 'Main'
