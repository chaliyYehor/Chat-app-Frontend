import clsx from 'clsx'
import { useState } from 'react'
import RightClick from './RightClick'
import ViewImage from './ViewImage'

export default function Message({ isMe = true }: { isMe: boolean }) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)

	const [toolsPosition, setToolsPosition] = useState<{
		x: number
		y: number
	} | null>(null)

	function handleContextMenu(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setToolsPosition({ x: e.clientX, y: e.clientY })
	}

	return (
		<>
			{isPreviewOpen && (
				<ViewImage
					src='/rozvrh3.png'
					alt='Preview'
					setShowPreview={setIsPreviewOpen}
				/>
			)}
			<div
				className={clsx(
					isMe ? 'justify-end' : 'justify-start',
					'w-full flex message',
				)}
				onContextMenu={handleContextMenu}
			>
				{toolsPosition && (
					<RightClick
						position={toolsPosition}
						onClose={() => setToolsPosition(null)}
					/>
				)}
				<div className='max-w-[70%] min-w-0 flex relative gap-2'>
					{!isMe && (
						<div
							className={`sticky bottom-0 self-end w-10 h-10 rounded-[50%] text-white flex justify-center items-center border-2 border-gray-700 shrink-0`.trim()}
						>
							PFP
							<div className='w-3 h-3 bg-green-500 border border-white rounded-[50%] absolute right-0 top-[68%]' />
						</div>
					)}
					<div className='flex-1 min-w-0 flex flex-col'>
						<div
							className={clsx(
								isMe
									? 'rounded-br-sm myMessage'
									: 'rounded-bl-sm bg-[#1E1E26] border border-gray-600',
								'rounded-2xl overflow-hidden',
							)}
						>
							<button
								className='w-full max-h-120 cursor-pointer'
								onClick={() => {
									setIsPreviewOpen(true)
								}}
							>
								<img
									className='w-full max-h-60 lg:max-h-120 object-cover'
									src='/rozvrh2.png'
									alt=''
								/>
							</button>

							<p
								className={
									'font-inter px-3.5 py-2 text-sm leading-relaxed wrap-anywhere whitespace-pre-wrap'
								}
							>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
								Veniam, rem. Neque facilis asperiores impedit provident
								assumenda deleniti inventore. Aspernatur necessitatibus id,
								dolore voluptas aperiam aliquid maiores quasi quo ab veritatis.
								Nulla, mollitia, modi nemo blanditiis at sapiente magnam dolorem
								nobis cumque praesentium, porro fugit aliquid itaque voluptatem
								eius necessitatibus. Error possimus veniam atque ducimus
								deleniti sequi quia laborum soluta laudantium mollitia aut, sit
								aliquam blanditiis asperiores similique esse provident neque
								molestiae at necessitatibus. Sit, iste a exercitationem
								architecto modi impedit. Nulla cumque hic maxime in quisquam
								maiores iure distinctio, consequatur temporibus magnam quis
								nobis impedit assumenda, est atque delectus quae accusantium
								iusto perferendis quaerat. Excepturi perspiciatis placeat
								ratione aliquam, porro architecto quisquam est provident, odio
								nobis laboriosam deserunt, voluptas non quasi. Dolorem
								cupiditate veniam, blanditiis et optio unde fugiat amet dolores
								quidem. Dolores reiciendis nisi, qui repellat totam ea at illo
								fuga error dolorum aut dolore pariatur nostrum unde eligendi
								nobis mollitia numquam voluptate necessitatibus quasi adipisci.
								Assumenda cupiditate in quos voluptatum quibusdam, voluptatem
								fuga iure voluptate obcaecati dolor, omnis modi placeat. Illo
								eos necessitatibus quis eaque assumenda, nobis dolor temporibus
								nulla dolorem excepturi voluptas ut reprehenderit quibusdam
								aliquid ad magni consequuntur delectus ipsum explicabo laborum
								accusamus aut, neque molestiae. Minus corporis veritatis
								recusandae possimus eius voluptate sequi et aliquam, vel beatae
								id provident commodi reprehenderit! Hic sit dolor, laborum odit
								officiis, cumque nemo reiciendis quaerat placeat error eveniet
								suscipit ea voluptatem quisquam officia! Debitis accusamus quas
								recusandae totam blanditiis, quod similique illum dolorum
								repellendus, harum beatae corrupti voluptatibus hic praesentium,
								molestiae quaerat quisquam sit in consequuntur! Explicabo
								dolores error voluptate, saepe in exercitationem provident
								eligendi qui tempore, aperiam consectetur molestias vitae quas
								quis impedit excepturi culpa, sequi temporibus? Doloribus,
								omnis? Atque dolorem placeat porro quia omnis reiciendis unde,
								expedita beatae suscipit provident ducimus magnam, enim debitis
								assumenda cum cumque ea nobis. Facilis est quos officia omnis
								enim, a deleniti, rem fugit perspiciatis veniam distinctio iure
								veritatis sunt, laboriosam dolores illo nostrum magni placeat
								dolorum iste unde consectetur. Eaque, quasi quia magni, officia
								maxime hic delectus animi iste ea quidem aliquam enim vitae
								natus! Dolorem fugiat vero repellat alias ipsa quibusdam nulla
								perspiciatis esse eligendi necessitatibus optio id, natus
								praesentium delectus atque laudantium recusandae numquam
								reprehenderit, veniam quisquam? Maxime fugit in error nihil
								iusto unde explicabo, impedit ipsam quidem rem eaque vero
								voluptatum reiciendis repellendus tenetur pariatur officiis quod
								ullam, consequuntur magnam debitis repudiandae cum. Est
								repellat, dolorum, voluptatem praesentium tempore quos nisi
								quaerat excepturi natus itaque quae eaque sed repudiandae
								cupiditate modi exercitationem perspiciatis ut expedita pariatur
								rerum corporis facere, atque cum. Distinctio laboriosam modi quo
								ducimus tenetur voluptate maiores sit ipsum repudiandae
								accusantium quidem dolores corporis quaerat inventore cum
								molestias minima magnam corrupti porro magni, laborum quis,
								velit dicta nobis. Commodi fugiat excepturi numquam illo, eos
								repellendus alias tempore officia suscipit blanditiis! Ad vel
								libero vero quibusdam cumque earum, a soluta quis, deserunt
								facere amet. Tenetur vero nostrum voluptatibus! Modi, fuga
								voluptatum, unde officiis dolores corporis assumenda cum nisi
								alias consequatur a ab molestiae perspiciatis veniam aut nemo?
							</p>
						</div>
						<p
							className={clsx(
								isMe ? 'self-end' : 'self-start',
								'text-[#6B6B80] text-[13px] font-mono ml-1',
							)}
						>
							When
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
