import { BrowserFrame, PhoneFrame } from "@/components/mockups/device-frames";
import { TabletMockup } from "@/components/mockups/product-mockups";

export function MultiDeviceSection() {
  return (
    <section
      className="section-pad relative overflow-hidden bg-white"
      aria-labelledby="devices-heading"
    >
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" />
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Multi-device</p>
          <h2 id="devices-heading" className="section-title mt-3">
            From the Site to the Office
          </h2>
          <p className="section-lead mx-auto">
            Site teams can work from mobile while owners and accountants manage the complete
            business from larger screens.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-10 lg:grid lg:grid-cols-[0.8fr_1.35fr_0.9fr] lg:items-end lg:gap-6">
          <div className="order-2 flex w-full max-w-[12rem] flex-col items-center lg:order-1 lg:max-w-none">
            <PhoneFrame
              src="/brand/screens/mobile-home.png"
              alt="CM360 mobile app home screen"
              width={780}
              height={1684}
              className="!w-[10.5rem] sm:!w-[11.25rem]"
            />
            <p className="mt-4 text-sm font-semibold text-ink">Mobile</p>
            <p className="mt-1 text-center text-xs text-muted">Attendance, updates & site work</p>
          </div>

          <div className="order-1 w-full max-w-2xl lg:order-2 lg:max-w-none">
            <BrowserFrame
              src="/brand/screens/desktop-home.png"
              alt="CM360 desktop financial dashboard"
              width={1400}
              height={1003}
            />
            <p className="mt-4 text-center text-sm font-semibold text-ink">Desktop / Web</p>
            <p className="mt-1 text-center text-xs text-muted">
              Full company control, reports and finance
            </p>
          </div>

          <div className="order-3 w-full max-w-md lg:max-w-none">
            <TabletMockup />
            <p className="mt-4 text-center text-sm font-semibold text-ink">Tablet</p>
            <p className="mt-1 text-center text-xs text-muted">Flexible field & office use</p>
          </div>
        </div>
      </div>
    </section>
  );
}
